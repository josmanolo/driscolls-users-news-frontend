import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types";
import axios from "axios";
import { FAILED, IDLE, LOADING, SUCCEEDED } from "./status";
interface LoginResponse {
  user: User;
  token: string;
}
interface LoginError {
  message: string;
}
interface AuthState {
  user: User | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  error: null,
  token: null,
  user: null,
  status: IDLE,
};

export const login = createAsyncThunk<
  LoginResponse,
  { email: string; password: string },
  { rejectValue: LoginError }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post<LoginResponse>(
      "http://localhost:3001/api/auth/login",
      { email, password }
    );
    sessionStorage.setItem("authToken", response.data.token);
    sessionStorage.setItem("user", JSON.stringify(response.data.user));
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setAuthUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("user");
      state.user = null;
      state.token = null;
      state.status = IDLE;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          console.log(action.payload);
          state.status = SUCCEEDED;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.error = null;
        }
      )
      .addCase(
        login.rejected,
        (state, action: PayloadAction<LoginError | undefined>) => {
          state.status = FAILED;
          state.error = action.payload?.message || "Error at login";
        }
      );
  },
});

const { reducer: authReducer, actions } = authSlice;
export const { logout, setAuthToken, setAuthUser } = actions;
export default authReducer;
