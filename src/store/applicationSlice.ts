/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { apiFetch } from "./api";

export interface Application {
  cover: any;
  _id?: string;
  name: string;
  email: string;
  // backend uses resume_link
  resume_link: string;
  // backend uses cover_note
  cover_note?: string;
  job_id?: string;
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
    // convert frontend model to backend naming
    const payload = {
      name: app.name,
      email: app.email,
      resume_link: app.resume_link,
      cover_note: app.cover_note,
      job_id: app.job_id,
    };
    const data = await apiFetch(`/applications`, {
      method: "POST",
      body: JSON.stringify(payload),
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
