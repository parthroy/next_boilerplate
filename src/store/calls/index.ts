import * as callsAPI from "../../api/calls";


// types.ts
export interface CallData {
  calldate: string;
  calluid: string;
  clid: string;
  src: string;
  dst: string;
  answer: string;
  end: string;
  duration: string;
  billsec: string;
  userresponse_1: string;
  userresponse_2: string;
  userresponse_3: string;
  userresponse_4: string;
  userresponse_5: string;
  recording_responce_path: string;
  fullrecording: string;
  days: number;
  lead_type: string | null;
  sentiment: string | null;
}

export interface CallsState {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  userReplies: CallData[];
  loading: boolean;
  error: string | null;
  message: string | null;
  status: string;

}

// callsSlice.ts
import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NOTIFICATION_TYPE, notify } from "../notification";

const callsAdapter = createEntityAdapter<CallData>({
  selectId: (call) => call.calluid,
});

const initialState = callsAdapter.getInitialState({
  totalItems: 0,
  totalPages: 0,
  currentPage: 1,
  loading: false,
  error: null,
  message: null,
  userReplies: [],
  status: 'init'
} as CallsState);

const fetchCalls = createAsyncThunk("calls/fetchCalls", async (params, { rejectWithValue }) => {
  try {
    console.log(params);
    const res = await callsAPI.fetchCalls(params);
    return res.data;
  } catch (error) {
    console.error(error);
    // Add toast notification for error
    notify('Something went error!.', NOTIFICATION_TYPE.ERROR);
    return rejectWithValue(error.response?.data || 'An unknown error occurred');
  }
});
const callsSlice = createSlice({
  name: "calls",
  initialState,
  reducers: {
    setCallsStart: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setCallsSuccess: (state, action: PayloadAction<CallsState>) => {
      state.loading = false;
      state.totalItems = action.payload.totalItems;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
      callsAdapter.setAll(state, action.payload.userReplies);
    },
    setCallsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addCall: (state, action: PayloadAction<CallData>) => {
      callsAdapter.addOne(state, action.payload);
    },
    updateCall: (state, action: PayloadAction<CallData>) => {
      callsAdapter.upsertOne(state, action.payload);
    },
    removeCall: (state, action: PayloadAction<string>) => {
      callsAdapter.removeOne(state, action.payload);
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: {
    // login

    [fetchCalls.pending]: (state: { status: string; loading: boolean; }) => {
      state.status = "loggingIn";
      state.loading = true;
    },

    [fetchCalls.fulfilled]: (state: { status: string; totalItems: any; totalPages: any; currentPage: any; loading: boolean; userReplies: any; }, action: { payload: { totalItems: any; totalPages: any; currentPage: any; userReplies: any; }; }) => {
      state.status = "idle";
      state.totalItems = action.payload.totalItems;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
      state.loading = false;
      state.userReplies = action.payload.userReplies;
    },

    [fetchCalls.rejected]: (state: { status: string; error: any; loading: boolean; }, action: { error: { message: any; }; }) => {
      state.status = "error";
      state.error = action.error.message;
      state.loading = false;
    },


  },
});

export const {
  setCurrentPage,
  setCallsStart,
  setCallsSuccess,
  setCallsFailure,
  addCall,
  updateCall,
  removeCall,
  setMessage,
  clearMessage,
  clearError,
} = callsSlice.actions;

export default callsSlice.reducer;
export { fetchCalls }