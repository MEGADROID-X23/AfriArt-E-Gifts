import {
  createContext,
  useContext,
  useReducer,
  useState,
  useCallback,
} from "react";
import { useAuth } from "./AuthProvider";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { userDataReducer, initialUserData } from "../reducer/userDataReducer";

const UserDataContext = createContext();

export function UserProvider({ children }) {
  const [cartLoading, setCartLoading] = useState(false);
  const [error, setError] = useState("");
  const [userDataState, dispatch] = useReducer(userDataReducer, initialUserData);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Helper functions
  const isProductInCart = (product) => {
    return userDataState.cartProducts?.find(item => item._id === product._id);
  };

  const isProductInWishlist = (product) => {
    return userDataState.wishlistProducts?.find(item => item._id === product._id);
  };

  // Cart handlers
  const addToCartHandler = (product) => {
    if (!auth.isAuth) {
      toast("Please login first!");
      navigate("/login", { state: { from: location } });
      return;
    }
    
    if (!product.is_stock) {
      toast.error(`Sorry, ${product.name} is not in stock.`);
      return;
    }

    setCartLoading(true);
    try {
      if (!isProductInCart(product)) {
        dispatch({
          type: "SET_CART",
          payload: [...userDataState.cartProducts, { ...product, qty: 1 }]
        });
        toast.success(`${product.name} added to cart successfully!`);
      } else {
        navigate("/cart");
      }
    } catch (err) {
      setError("Failed to add to cart");
      toast.error("Failed to add to cart");
    } finally {
      setCartLoading(false);
    }
  };

  const removeFromCartHandler = (product) => {
    setCartLoading(true);
    try {
      dispatch({
        type: "SET_CART",
        payload: userDataState.cartProducts.filter(item => item._id !== product._id)
      });
      toast.success(`${product.name} removed from cart successfully!`);
    } catch (err) {
      setError("Failed to remove from cart");
      toast.error("Failed to remove from cart");
    } finally {
      setCartLoading(false);
    }
  };

  const cartCountHandler = (product, type) => {
    setCartLoading(true);
    try {
      const updatedCart = userDataState.cartProducts.map(item => {
        if (item._id === product._id) {
          if (type === "decrement" && item.qty === 1) {
            throw new Error("Quantity cannot be less than 1");
          }
          return {
            ...item,
            qty: type === "increment" ? item.qty + 1 : item.qty - 1
          };
        }
        return item;
      });
      
      dispatch({ type: "SET_CART", payload: updatedCart });
      toast.success(
        type === "decrement"
          ? `Removed one ${product.name} from the cart!`
          : `Added another ${product.name} to the cart!`
      );
    } catch (err) {
      setError("Failed to update quantity");
      toast.error("Failed to update quantity");
    } finally {
      setCartLoading(false);
    }
  };

  // Wishlist handlers
  const addToWishlistHandler = (product) => {
    if (!auth.isAuth) {
      toast("Please login first!");
      navigate("/login", { state: { from: location } });
      return;
    }

    setCartLoading(true);
    try {
      if (!isProductInWishlist(product)) {
        dispatch({
          type: "SET_WISHLIST",
          payload: [...userDataState.wishlistProducts, product]
        });
        toast.success(`${product.name} added to wishlist successfully!`);
      } else {
        dispatch({
          type: "SET_WISHLIST",
          payload: userDataState.wishlistProducts.filter(item => item._id !== product._id)
        });
      }
    } catch (err) {
      setError("Failed to update wishlist");
      toast.error("Failed to update wishlist");
    } finally {
      setCartLoading(false);
    }
  };

  const removeFromWishlistHandler = (product) => {
    setCartLoading(true);
    try {
      dispatch({
        type: "SET_WISHLIST",
        payload: userDataState.wishlistProducts.filter(item => item._id !== product._id)
      });
      toast.success(`${product.name} removed from wishlist successfully!`);
    } catch (err) {
      setError("Failed to remove from wishlist");
      toast.error("Failed to remove from wishlist");
    } finally {
      setCartLoading(false);
    }
  };

  // Price calculations
  const totalDiscountedPrice = userDataState.cartProducts?.reduce(
    (acc, curr) => acc + curr.discounted_price * curr.qty,
    0
  );

  const totalOriginalPrice = userDataState.cartProducts?.reduce(
    (acc, curr) => acc + curr.original_price * curr.qty,
    0
  );

  const discountPercent = () => {
    if (!userDataState.cartProducts?.length) return 0;
    const totalPrice = userDataState.cartProducts.reduce(
      (acc, curr) => ({
        ...acc,
        original: acc.original + curr.original_price,
        discount: acc.discount + curr.discounted_price,
      }),
      { original: 0, discount: 0 }
    );
    const totalDiscount = (totalPrice.original - totalPrice.discount) / totalPrice.original;
    return totalDiscount.toFixed(2) * 100;
  };

  const clearCartHandler = () => {
    try {
      dispatch({ type: "SET_CART", payload: [] });
    } catch (err) {
      setError("Failed to clear cart");
      toast.error("Failed to clear cart");
    }
  };

  return (
    <UserDataContext.Provider
      value={{
        userDataState,
        dispatch,
        addToCartHandler,
        addToWishlistHandler,
        removeFromWishlistHandler,
        isProductInCart,
        removeFromCartHandler,
        isProductInWishlist,
        totalDiscountedPrice,
        totalOriginalPrice,
        discountPercent,
        initialUserData,
        wishlistHandler: addToWishlistHandler,
        cartCountHandler,
        cartLoading,
        clearCartHandler,
        error,
        setError,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export const useUserData = () => useContext(UserDataContext);