/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { apiFetch } from "./api";

interface AuthState {
  token: string | null;
  user: any | null;
  role: "admin" | "user" | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user") || "null"),
  role: (localStorage.getItem("role") as "admin" | "user" | null) || null,
  loading: false,
  error: null,
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials: { email: string; password: string; name: string; role: string }) => {
    const data = await apiFetch(`/auth/register`, {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    return data;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string; role: string }) => {
    const data = await apiFetch(`/auth/login`, {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    return data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      state.role = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload.user || null;
        state.token = action.payload.token || null;
        state.role = action.payload.role || null;
        if (state.token) {
          localStorage.setItem("token", state.token);
          localStorage.setItem("user", JSON.stringify(state.user));
          localStorage.setItem("role", state.role || "");
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload.user || null;
        state.token = action.payload.token || null;
        state.role = action.payload.role || null;
        if (state.token) {
          localStorage.setItem("token", state.token);
          localStorage.setItem("user", JSON.stringify(state.user));
          localStorage.setItem("role", state.role || "");
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
