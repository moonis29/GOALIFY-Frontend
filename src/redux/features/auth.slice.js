import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../API";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  isLoading: false,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userObj) => {
    try {
      const response = await axios.post(`${API}/users/register`, userObj);
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        localStorage.setItem("token", response.data.token);
      }
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const loginUser = createAsyncThunk("auth/loginUser", async (userObj) => {
  try {
    const response = await axios.post(`${API}/users/login`, userObj);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data.data));
      localStorage.setItem("token", response.data.token);
    }
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  } catch (error) {
    console.log(error);
  }
});

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.token = payload.token;
        state.user = payload.data;
      })
      .addCase(loginUser.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.token = payload.token;
        state.user = payload.data;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
      });
  },
});

export default authSlice.reducer;
