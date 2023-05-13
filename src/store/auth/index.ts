import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import * as authAPI from "../../api/auth";
import { RootState } from '@/store';

const clientAdapter = createEntityAdapter();

interface AuthState {
  isAuth: boolean;
  token: string;
  role: string;
  status: string;
  email: string;
  expires: any;
  error: any;
  admin: boolean;
  ui: {
    login: any;
    msg: string;
  };
}

const initialState = clientAdapter.getInitialState({
  isAuth: false,
  token: null,
  role: 'undefined',
  status: 'fetchingFromLocalStore',
  email: null,
  expires: null,
  error: null,
  admin: false,
  ui: {
    login: {},
    msg: '',
  },
} as unknown as AuthState);

const getAuthState = (state: RootState) => state.auth;
const login = createAsyncThunk("auth/login", async (params) => {
  const res = await authAPI.login(params);
  return res.data;
});

const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ email, user }: any) => {
    if (user === null) return;
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,

  reducers: {
    persistLogin: (state) => {
      // if (isLocalStorageAvailable()) {
      // const token = localStorage.getItem("persist:auth");
      // const expires = localStorage.getItem("expires");
      // if (token) {
      //   state.isAuth = true;
      //   state.token = token;
      //   if (expires) {
      //     state.expires = expires;
      //   }
      // }
      state.status = "idle";
      // }
    },
    userregister: (state) => {
      state.isAuth = false;
      state.token = null;
      state.expires = null;
      state.status = "unregistered";
    },
    logout: (state) => {
      state.isAuth = false;
      state.token = null;
      state.expires = null;
      state.status = "loggingOut";
    },
    sessionExpired: (state) => {
      // if (isLocalStorageAvailable()) {
      //   localStorage.removeItem("token");
      //   localStorage.removeItem("expires");
      // }
      state.isAuth = false;
      state.token = null;
      state.status = "sessionExpired";
      state.expires = null;
      state.error = "sessionExpired";
    },
  },

  extraReducers: {
    // login

    [login.pending]: (state) => {
      state.status = "loggingIn";
      state.ui.login.loading = true;
    },

    [login.fulfilled]: (state, action) => {
      state.status = "idle";
      state.isAuth = true;
      state.token = action.payload.data.token;
      if (action.payload.admin) {
        state.admin = action.payload.admin;
      } else {
        state.admin = false;
      }
      state.ui.login.loading = false;
    },

    [login.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
      state.ui.login.loading = false;
    },

    // resetPassword
    [resetPassword.pending]: (state) => {
      state.status = "resetingPassword";
      state.ui.login.loading = true;
      state.ui.error = "";
      state.ui.msg = "";
    },

    [resetPassword.fulfilled]: (state, action) => {
      state.status = "idle";

      state.ui.msg = action.payload.msg;
      state.ui.login.loading = false;
    },

    [resetPassword.rejected]: (state, action) => {
      state.status = "idle";
      state.ui.error = action.error.message;
      state.ui.login.loading = false;
    },

  },
});

const { persistLogin, logout, sessionExpired } = authSlice.actions;

export default authSlice.reducer;

export {
  persistLogin,
  login,
  logout,
  sessionExpired,
  resetPassword,
  getAuthState,
};
