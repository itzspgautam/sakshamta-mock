import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "@/state/features/AuthSlice";
import ExamReducer from "@/state/features/ExamSlice";

import AdminAuthReducer from "@/state/features/AdminAuthSlice";

export const store = configureStore({
  reducer: {
    Auth: AuthReducer,
    Exam: ExamReducer,
    AdminAuth: AdminAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
