import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./jobSlice";
import applicationsReducer from "./applicationSlice";
import authReducer from "./authSlice";
import usersReducer from "./userSlice";

const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    applications: applicationsReducer,
    auth: authReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
