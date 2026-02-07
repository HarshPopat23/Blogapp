

import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import authService from "../../appwrite/auth";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout(); 
      dispatch(logout());         
      navigate("/");             
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-6 py-2 text-white bg-red-500 rounded-full hover:bg-red-600 duration-200"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
