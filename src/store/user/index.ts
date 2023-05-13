import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const clientAdapter = createEntityAdapter();

interface UserState {
  banned: boolean;
  email: string;
  first_name: string;
  id: string;
  last_name: string;
  password: string;
  reg_date: string;
  role: string;
  sugar: any;
  username: string;
}

const initialState = clientAdapter.getInitialState({
  banned: false,
  email: null,
  first_name: null,
  id: null,
  last_name: null,
  password: null,
  reg_date: null,
  role: 'user',
  sugar: null,
  username: null,
} as unknown as UserState);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    authenticateUser: (state, action) => {
      return action.payload;
    },
    reset: (state) => initialState,
  },
});

const { authenticateUser, reset } = userSlice.actions;

export default userSlice.reducer;

export { authenticateUser, reset };
