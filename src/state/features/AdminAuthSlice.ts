import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import AppConfig from "@/config/appCongif";
import { ExamInterface, ParticipateInterface } from "@/interface/ExamInterface";
import { AdminInterface } from "@/interface/AdminInterface";

export interface AdminAuthState {
  admin: AdminInterface | null;
  token: string | null;
  error: string | null;
  loading: boolean;
}

interface AdminLoginProps {
  email: string;
  password: string;
}

const initialState: AdminAuthState = {
  admin: null,
  token: null,
  error: null,
  loading: false,
};

// Candidate Login
export const adminLogin = createAsyncThunk(
  "auth/Admin Login",
  async (loginData: AdminLoginProps, { rejectWithValue }) => {
    try {
      const { email, password } = loginData;

      if (!email || !password) {
        return rejectWithValue("email and password are required.");
      }

      const { data } = await axios.post(
        `${AppConfig.API}/api/admin/auth/login`,
        {
          email,
          password,
        }
      );

    
      return data;
    } catch (error: any) {
      let message = error?.response?.data?.message
        ? error?.response?.data?.message
        : error.message;
      return rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload.admin;
        state.token = action.payload.token;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.admin = null;
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
