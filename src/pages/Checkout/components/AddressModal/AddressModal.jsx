import "./AddressModal.css";
import React, { useState, useEffect } from "react";
import { useUserData } from "../../../../contexts/UserDataProvider";
import { useAddress } from "../../../../contexts/AddressProvider";
import { toast } from "react-hot-toast";

export const AddressModal = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { dispatch } = useUserData();
  const {
    setIsAddressModalOpen,
    addressForm,
    setAddressForm,
    isEdit,
    setIsEdit,
  } = useAddress();

  // Mock user data for offline authentication
  const mockUserData = {
    id: "mock-user-123",
    name: "Afriart User",
    email: "aniket@example.com",
    isAuthenticated: true,
    addresses: [
      {
        name: "Afriart Client",
        street: "12/3A Main Post Office",
        city: "Anywhere",
        state: "Wherever",
        country: "Somewhere",
        pincode: "123456",
        phone: "123-456-7890",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]
  };

  // Auto-authenticate with mock data on component mount
  useEffect(() => {
    try {
      // Simulate successful authentication
      dispatch({
        type: "SET_USER_DATA",
        payload: mockUserData
      });
      toast.success("Successfully authenticated with mock data!");
    } catch (err) {
      setError("Failed to authenticate with mock data");
      toast.error("Failed to authenticate with mock data");
    }
  }, [dispatch]);

  const updateAddress = () => {
    setLoading(true);
    try {
      // Update address in local state
      dispatch({
        type: "SET_ADDRESS",
        payload: {
          ...addressForm,
          updatedAt: new Date().toISOString()
        }
      });
      toast.success(` ${addressForm.name}'s address updated successfully!`);
    } catch (err) {
      setError("Failed to update address");
      toast.error("Failed to update address");
    } finally {
      setLoading(false);
    }
  };

  const addAddress = () => {
    setLoading(true);
    try {
      // Add new address to local state
      dispatch({
        type: "SET_ADDRESS",
        payload: {
          ...addressForm,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      });
      toast.success("New address added successfully!");
    } catch (err) {
      setError("Failed to add address");
      toast.error("Failed to add address");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    try {
      // Handle non-iterable values by converting them to strings
      const processedValue = typeof value === 'string' ? value : String(value);
      setAddressForm(prevForm => ({
        ...prevForm,
        [name]: processedValue
      }));
    } catch (err) {
      setError("Failed to update form field");
      toast.error("Failed to update form field");
    }
  };

  return (
    <div className="address-modal-container">
      <div className="address-input-container">
        <h1>Address Form</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!isEdit) {
              addAddress();
              setAddressForm({
                name: "",
                street: "",
                city: "",
                state: "",
                country: "",
                pincode: "",
                phone: "",
              });
              setIsAddressModalOpen(false);
            } else {
              updateAddress();
              setAddressForm({
                name: "",
                street: "",
                city: "",
                state: "",
                country: "",
                pincode: "",
                phone: "",
              });
              setIsAddressModalOpen(false);
              setIsEdit(false);
            }
          }}
          className="input-container"
        >
          <input
            name="name"
            value={addressForm.name}
            required
            onChange={handleChange}
            placeholder="Enter Name"
          />
          <input
            required
            value={addressForm.street}
            onChange={handleChange}
            placeholder="Enter Street"
          />
          <input
            name="city"
            required
            value={addressForm.city}
            onChange={handleChange}
            placeholder="Enter City"
          />
          <input
            name="state"
            required
            value={addressForm.state}
            onChange={handleChange}
            placeholder="Enter State"
          />
          <input
            name="country"
            value={addressForm.country}
            required
            onChange={handleChange}
            placeholder="Enter Country"
          />
          <input
            name="pincode"
            value={addressForm.pincode}
            required
            onChange={handleChange}
            placeholder="Enter Pincode"
          />
          <input
            name="phone"
            value={addressForm.phone}
            required
            onChange={handleChange}
            placeholder="Enter Phone"
            minLength="8"
          />
          <input className="submit" type="submit" value="Save" />
        </form>
        <div className="btn-container">
          <button onClick={() => setIsAddressModalOpen(false)}>Cancel</button>
          <button
            onClick={() => {
              setAddressForm({ ...mockUserData.addresses[0] });
            }}
          >
            Add Dummy Data
          </button>
        </div>
      </div>
    </div>
  );
};