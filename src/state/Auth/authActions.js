import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import { api } from "../../config/api";
import {useNavigate} from 'react-router-dom';


export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const {data} = await axios.post(
        `${API_BASE_URL}/auth/signup`,
        loginData.data
      );
      localStorage.setItem("token", data.token);
      console.log("Register Successful",data);
      return data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);



export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const {data} = await axios.post(
        `${API_BASE_URL}/auth/signin`,
        loginData.data
      );
      localStorage.setItem("token", data.token);
      console.log("Login Successful", data);
      return data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      await axios.post(
        `${API_BASE_URL}/auth/logout`, 
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem("token"); // Remove the token from localStorage
      console.log("Logout Successful");
      return "Logout Successful"; // Return a success message
    } catch (error) {
      console.log(error.response?.data || "Error during logout");
      return rejectWithValue(error.response?.data || "Logout failed");
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (jwt, { rejectWithValue }) => {
    try{
      const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("Profile Fetched",data);
      return data;
    }
    catch(error){
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (reqData, { rejectWithValue }) => {
    try{
      const jwt = localStorage.getItem("token");
      const { data } = await api.put(
        `${API_BASE_URL}/api/users`,
        reqData
      );
      console.log("Profile Updated",data);
      return data;
    }
    catch(error){
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchUsers = createAsyncThunk(
  "auth/searchUsers",
  async (query, { rejectWithValue }) => {
    try{
      const { data } = await api.get(
        `${API_BASE_URL}/api/users/search?query=${query}`
      );
      console.log("Users Searched",data);
      return data;
    }
    catch(error){
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);