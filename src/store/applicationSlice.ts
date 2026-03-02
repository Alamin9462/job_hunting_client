import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { apiFetch } from "./api";

export interface Application {
  _id?: string;
  name: string;
  email: string;
  resume: string;
  cover?: string;
  jobId?: string;
}

interface ApplicationState {
  applications: Application[];
  loading: boolean;
  error: string | null;
}

const initialState: ApplicationState = {
  applications: [],
  loading: false,
  error: null,
};

export const submitApplication = createAsyncThunk(
  "applications/submit",
  async (app: Application) => {
    const data = await apiFetch(`/applications`, {
      method: "POST",
      body: JSON.stringify(app),
    });
    return data as Application;
  }
);

export const fetchApplications = createAsyncThunk(
  "applications/fetchAll",
  async () => {
    const data = await apiFetch(`/applications`);
    return data as Application[];
  }
);

const applicationSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitApplication.fulfilled, (state, action: PayloadAction<Application>) => {
        state.loading = false;
        state.applications.push(action.payload);
      })
      .addCase(submitApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      })
      .addCase(fetchApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplications.fulfilled, (state, action: PayloadAction<Application[]>) => {
        state.loading = false;
        state.applications = action.payload;
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      });
  },
});

export default applicationSlice.reducer;
