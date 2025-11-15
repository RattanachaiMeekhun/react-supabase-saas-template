//authSlice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";
// Define the initial state of the auth slice
interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
  } | null;
  loading: boolean;
  error: string | null;
}

// Define the payload and response types for login
export type LoginPayload = {
  email: string;
  password: string;
};
export type LoginResponse = {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

// Async thunk to check authentication status
export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/auth/check");
      return response.data;
    } catch {
      return rejectWithValue("Failed to check authentication status");
    }
  }
);
// Async thunk to log in a user
export const loginUser = createAsyncThunk<LoginResponse, LoginPayload>(
  "auth/loginUser",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance
        .post("/auth/login", credentials)
        .catch((error) => error.response);
      if (response.data.error) {
        return rejectWithValue(response.data.error);
      }
      return response.data;
    } catch {
      return rejectWithValue("Login failed");
    }
  }
);
// Async thunk to log out a user
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      return response.data;
    } catch {
      return rejectWithValue("Logout failed");
    }
  }
);
// Async thunk to sign up a user
export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance
        .post("/auth/signup", credentials)
        .catch((error) => error.response);
      if (response.data.error) {
        return rejectWithValue(response.data.error);
      }
      return response.data;
    } catch {
      return rejectWithValue("Sign up failed");
    }
  }
);
// Create the auth slice
const authSlice = createSlice({
  initialState: initialState,
  name: "auth",
  reducers: {
    resetAuthState: (state) => {
      state.isAuthenticated = false;
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
        state.loading = false;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loading = false;
        state.error = action.payload as string;
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
