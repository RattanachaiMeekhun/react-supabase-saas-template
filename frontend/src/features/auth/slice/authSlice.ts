// authSlice - Redux slice for authentication state management
import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "./authTypes";
import {
  checkAuthStatus,
  loginUser,
  logoutUser,
  signUpUser,
} from "./authThunks";

const initialState: AuthState = {
  isAuthenticated: null,
  token: null,
  user: null,
  loading: false,
  error: null,
};

// Create the auth slice
const authSlice = createSlice({
  initialState: initialState,
  name: "auth",
  reducers: {
    resetAuthState: (state) => {
      state.isAuthenticated = null;
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.access_token || null;
        state.loading = false;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        if (action.payload === "No access token found") {
          state.isAuthenticated = false;
        } else {
          state.error = action.payload as string;
        }
        state.isAuthenticated = false;
        state.user = null;
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        const { access_token, refresh_token, user } = action.payload;
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        localStorage.setItem("user", JSON.stringify(user));
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state) => {
        // Optionally handle sign up success
        state.loading = false;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
// Export actions and reducer
export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
