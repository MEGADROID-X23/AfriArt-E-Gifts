import React, { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { loginService } from "../services/auth-services/loginService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("cart"); // Changed from "profile" to "cart"
  const [loginCredential, setLoginCredential] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  
  // Initialize with mock data to skip login
  const mockUser = {
    token: "mock-token",
    isAuth: true,
    firstName: "Guest",
    lastName: "User",
    email: "guest@example.com"
  };

  const [auth, setAuth] = useState(mockUser);
  
  // Update localStorage with mock data
  localStorage.setItem("token", mockUser.token);
  localStorage.setItem("isAuth", true);
  localStorage.setItem("firstName", mockUser.firstName);
  localStorage.setItem("lastName", mockUser.lastName);
  localStorage.setItem("email", mockUser.email);

  const navigate = useNavigate();
  const location = useLocation();

  // Modified login handler that does nothing
  const loginHandler = async (e, email, password) => {
    e.preventDefault();
    try {
      // Skip actual login and navigate to cart
      navigate("/cart");
    } catch (error) {
      setError("An error occurred");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loginHandler,
        error,
        setError,
        loginLoading,
        setLoginLoading,
        loginCredential,
        setLoginCredential,
        setCurrentPage,
        currentPage
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
