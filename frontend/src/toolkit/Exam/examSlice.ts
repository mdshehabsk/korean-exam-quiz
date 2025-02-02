import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISetQuestion } from "../../types/exam";

interface IInitialState {
  currentQuestion: ISetQuestion | null;
  resultCurrentQuestion: ISetQuestion | null
  submitExamData: Record<string, number>;
  isAudioPlaying: boolean;
  playedAudios: {
    [key: string]: {
      descriptionPlayed: boolean;
      options: number[];
    };
  };

}

const initialState: IInitialState = {
  currentQuestion: null,
  submitExamData: {},
  playedAudios: {},
  isAudioPlaying: false,
  resultCurrentQuestion : null
};

export const examSlice = createSlice({
  initialState,
  name: "examSlice",
  reducers: {
    handleCurrentQuestion: (state, action) => {
      const payload = action.payload;
      state.currentQuestion = payload;
    },
    handleResultCurrentQuestion: (state, action) => {
      const payload = action.payload
      state.resultCurrentQuestion = payload
    },
    handleSubmitExamData: (state, action) => {
      const payload = action.payload;
      state.submitExamData[payload.questionId] = payload.answerId;
    },
    handlePlayedAudios: (
      state,
      action: PayloadAction<{
        questionId: string;
        type: "description" | "options";
        currentOptionIndex?: number;
      }>
    ) => {
      const { questionId, type, currentOptionIndex } = action.payload;

      // Initialize the question object if it doesn't exist
      if (!state.playedAudios[questionId]) {
        state.playedAudios[questionId] = {
          descriptionPlayed: false,
          options: [],
        };
      }

      if (type === "description") {
        state.playedAudios[questionId].descriptionPlayed = true;
      }

      if (type === "options" && currentOptionIndex !== undefined) {
        if (
          !state.playedAudios[questionId].options.includes(currentOptionIndex)
        ) {
          state.playedAudios[questionId].options.push(currentOptionIndex);
        }
      }
    },
    handleIsAudioPlaying: (state, action: PayloadAction<boolean>) => {
      state.isAudioPlaying = action.payload;
    },
    reset: (state) => {
      state.currentQuestion = null;
    },
    resetResultCurrentQuestion : state => {
      state.resultCurrentQuestion = null
    }
  },
});

export const {
  handleSubmitExamData,
  reset,
  handleCurrentQuestion,
  handlePlayedAudios,
  handleIsAudioPlaying,
  handleResultCurrentQuestion,
  resetResultCurrentQuestion

} = examSlice.actions;
