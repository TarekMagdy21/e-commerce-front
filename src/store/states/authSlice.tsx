import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the root state type
interface RootState {
  auth: {
    token: string | null;
  };
}

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null } as RootState['auth'], // Initial state with the correct type
  reducers: {
    setCredentials: (state, action: PayloadAction<{ accessToken: string }>) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

// Explicitly define the type for the state parameter
export const selectCurrentToken = (state: RootState) => state.auth.token;