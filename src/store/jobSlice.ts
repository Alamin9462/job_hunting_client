import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { apiFetch } from "./api";

export interface Job {
  _id?: string;
  id?: number; // sometimes id used for local
  title: string;
  company: string;
  location: string;
  salary?: string;
  job_type?: string;
  category?: string;
  company_logo?: string;
  description?: string;
  created_at?: string;
}  

interface JobState {
  jobs: Job[];
  currentJob: Job | null;
  loading: boolean;
  error: string | null;
}

const initialState: JobState = {
  jobs: [],
  currentJob: null,
  loading: false,
  error: null,
};

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  const data = await apiFetch("/jobs");
  return data as Job[];
});

export const fetchJobById = createAsyncThunk(
  "jobs/fetchJobById",
  async (id: string) => {
    const data = await apiFetch(`/jobs/${id}`);
    return data as Job;
  }
);

export const createJob = createAsyncThunk(
  "jobs/createJob",
  async (job: Job) => {
    const data = await apiFetch(`/jobs`, {
      method: "POST",
      body: JSON.stringify(job),
    });
    return data as Job;
  }
);

export const deleteJob = createAsyncThunk(
  "jobs/deleteJob",
  async (id: string) => {
    await apiFetch(`/jobs/${id}`, { method: "DELETE" });
    return id;
  }
);

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    clearCurrentJob(state) {
      state.currentJob = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action: PayloadAction<Job[]>) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      })
      .addCase(fetchJobById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action: PayloadAction<Job>) => {
        state.loading = false;
        state.currentJob = action.payload;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      })
      .addCase(createJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createJob.fulfilled, (state, action: PayloadAction<Job>) => {
        state.loading = false;
        state.jobs.unshift(action.payload);
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      })
      .addCase(deleteJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteJob.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.jobs = state.jobs.filter((j) => j._id !== action.payload && j.id?.toString() !== action.payload);
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      });
  },
});

export const { clearCurrentJob } = jobsSlice.actions;
export default jobsSlice.reducer;
