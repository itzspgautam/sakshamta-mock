import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import AppConfig from "@/config/appCongif";
import {
  AnswerInterface,
  ExamInterface,
  QuestionInterface,
} from "@/interface/ExamInterface";
import { RootState } from "../store";

export interface ExamState {
  exam: ExamInterface | null;
  questions: QuestionInterface[] | null;
  answers: AnswerInterface[] | null;
  error: string | null;
  loading: boolean;
  language: "Hindi" | "English";
  participation: any;
  new: newExamInterface;
}

export interface newExamInterface {
  exam: { title: string; venue: string; duration: number } | null;
  question: QuestionInterface[] | null;
  status: string;
}

export interface CreateExamprop {
  newExam: { title: string; venue: string; duration: number,examDate:Date };
  question: QuestionInterface[];
}

const initialState: ExamState = {
  exam: null,
  questions: null,
  answers: null,
  error: null,
  loading: false,
  language: "Hindi",
  participation: null,
  new: { exam: null, question: null, status: "" },
};

export const fetchQuestions = createAsyncThunk(
  "exam/fetchQuestions",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.Auth.token;

      const { data } = await axios.post(
        `${AppConfig.API}/api/candidate/exam/get-question`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (error: any) {
      let message = error?.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

export const submitAnswer = createAsyncThunk(
  "exam/submit",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.Auth.token;
      const exam = state?.Exam.exam;
      const answers = state?.Exam.answers;

      const { data } = await axios.post(
        `${AppConfig.API}/api/candidate/exam/submit-answer`,
        {
          exam,
          answers,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Submitttttt", data);

      return data;
    } catch (error: any) {
      let message = error?.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

export const updateAnswer = createAsyncThunk(
  "exam/updateAnswer",
  async (updateProps: AnswerInterface, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const answersList = state.Exam.answers;

      if (!answersList) {
        throw new Error("Answers list is not available.");
      }

      const indexToUpdate = answersList.findIndex(
        (item) => item?.question === updateProps?.question
      );

      if (indexToUpdate !== -1) {
        const updatedAnswersList = [...answersList];
        updatedAnswersList[indexToUpdate] = {
          ...updatedAnswersList[indexToUpdate],
          status: updateProps.status,
          answer: updateProps.answer,
        } as any;

        return updatedAnswersList;
      } else {
        throw new Error("Index not found.");
      }
    } catch (error: any) {
      console.error(error);
      let message = error?.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

export const CretaeExam = createAsyncThunk(
  "exam/admin/create-exam",
  async (
    createProp: CreateExamprop,
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const state = getState() as RootState;
      const token = state.AdminAuth.token;

      const { newExam, question } = createProp;
      if (!question) {
        throw new Error("Please upload excel sheet");
        return;
      }
      const { title, venue, duration,examDate } = newExam;
      if (!title || !venue || !duration || !examDate) {
        throw new Error("Title, Venue, date of exam and duration are required!");
        return;
      }
      await dispatch(updateExamStatus("Creating Exam Instance..."));

      const { data } = await axios.post(
        `${AppConfig.API}/api/admin/exam/create`,
        newExam,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const exam = data?.exam?._id;
      await dispatch(
        updateExamStatus("Uploading " + question?.length + " Question...")
      );

      const { data: quesData } = await axios.post(
        `${AppConfig.API}/api/admin/exam/question/create-bulk`,
        { examId: exam, questions: question },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await dispatch(updateExamStatus("Uploaded"));
      console.log(quesData);
      return quesData;
    } catch (error: any) {
      let message = error?.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

export const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    setLang: (state, action: PayloadAction<any>) => {
      state.language = action.payload;
    },
    updateExamStatus: (state, action: PayloadAction<any>) => {
      state.new ? (state.new.status = action.payload) : null;
    },
    clearNewExam: (state) => {
      state.new = initialState.new as any;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload?.questions;
        state.exam = action.payload?.exam;

        state.answers = action.payload?.questions.map(
          (item: QuestionInterface) => ({
            question: item._id,
            status: "UNATT",
            answer: null,
          })
        );
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateAnswer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAnswer.fulfilled, (state, action) => {
        state.loading = false;
        state.answers = action.payload as any;
      })
      .addCase(updateAnswer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(submitAnswer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitAnswer.fulfilled, (state, action) => {
        state.loading = false;
        state.participation = action.payload.participation;
      })
      .addCase(submitAnswer.rejected, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.error = action.payload as string;
        state.participation = null;
      })
      .addCase(CretaeExam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CretaeExam.fulfilled, (state, action) => {
        state.loading = false;
        state.new.exam = action.payload.questions[0].exam;
        state.new.question = action.payload.questions;
      })
      .addCase(CretaeExam.rejected, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.error = action.payload as string;
        state.participation = null;
      });
  },
});

export const { setLang, updateExamStatus,clearNewExam } = examSlice.actions;
export default examSlice.reducer;
