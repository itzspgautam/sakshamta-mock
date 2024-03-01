import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import AppConfig from "@/config/appCongif";
import { CandidateInterface } from "@/interface/CandidateInterface";
import { ExamInterface, ParticipateInterface } from "@/interface/ExamInterface";

export interface AuthState {
  candidate: CandidateInterface | null;
  token:string | null;
  error: string | null;
  loading: boolean;
  participation: ParticipateInterface | null;
  exam:ExamInterface | null
}

interface CandidateLoginProps {
  username: string;
  password: string;
}

const initialState: AuthState = {
  candidate: null,
  token:null,
  error: null,
  loading: false,
  participation:null,
  exam:null
};

// Candidate Login
export const candidateLogin = createAsyncThunk(
  "auth/Candidate Login",
  async (loginData: CandidateLoginProps, { rejectWithValue }) => {
    try {
      const { username, password } = loginData;

      if (!username || !password) {
        return rejectWithValue("Username and password are required.");
      }

      const { data } = await axios.post(`${AppConfig.API}/api/candidate/auth`, {
        username,
        password,
      });


      return data;
    } catch (error: any) {

     let message =   error?.response?.data?.message ? error?.response?.data?.message:error.message;
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
      .addCase(candidateLogin.pending, (state) => {
        state.loading = true;
        state.error= null;

      })
      .addCase(candidateLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.candidate = action.payload.candidate;
        state.participation = action.payload.participation;
        state.exam = action.payload.exam;
        state.token = action.payload.token
      })
      .addCase(candidateLogin.rejected, (state, action) => {
        state.candidate=null;
        state.loading = false;
        
        state.error= action.payload as string;
      });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
