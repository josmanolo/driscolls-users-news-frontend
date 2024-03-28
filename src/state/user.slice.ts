import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { User, UsersState } from "../types";
import { IDLE, LOADING, FAILED, SUCCEEDED } from "./status";

const initialState: UsersState = {
  entities: [],
  status: IDLE,
  error: null,
};

export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<User[]>(
        "http://localhost:3001/api/users"
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error.response?.data || "An unknown error occurred"
      );
    }
  }
);

export const fetchUserById = createAsyncThunk<User, string>(
  "users/fetchUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get<User>(
        `http://localhost:3001/api/users/${userId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "An unknown error occurred"
      );
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:3001/api/users/${userId}`);
      return userId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error deleting user");
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (userData: User, { rejectWithValue }) => {
    try {
      const response = await axios.put<User>(
        `http://localhost:3001/api/users/${userData._id}`,
        userData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error updating user");
    }
  }
);

export const addUser = createAsyncThunk(
  "users/addUser",
  async (userData: User, { rejectWithValue }) => {
    try {
      const response = await axios.post<User>(
        "http://localhost:3001/api/users",
        userData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error adding user");
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = SUCCEEDED;
        state.entities = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = FAILED;
        state.error = action.error.message;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(
        fetchUserById.fulfilled,
        (state, action: PayloadAction<User>) => {
          const index = state.entities.findIndex(
            (user) => user._id === action.payload._id
          );
          if (index !== -1) {
            state.entities[index] = action.payload;
          } else {
            state.entities.push(action.payload);
          }
          state.status = SUCCEEDED;
        }
      )
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = FAILED;
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.entities = state.entities.filter(
          (user) => user._id !== action.payload
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = FAILED;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = LOADING;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        const index = state.entities.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) {
          state.entities[index] = action.payload;
        }
        state.status = SUCCEEDED;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = FAILED;
        state.error = action.error.message;
      })
      .addCase(addUser.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.entities.push(action.payload);
        state.status = SUCCEEDED;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = FAILED;
        state.error = action.error.message;
      });
  },
});

const { reducer: userReducer } = userSlice;
export default userReducer;
