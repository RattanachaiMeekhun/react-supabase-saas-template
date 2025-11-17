import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  name: string;
  email: string;
  isAuthenticated: boolean;
};

const initialState: UserState = {
  name: "",
  email: "",
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    clearUser(state) {
      state.name = "";
      state.email = "";
    },
  },
  extraReducers: () => {
    // Add any additional reducers if needed
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
