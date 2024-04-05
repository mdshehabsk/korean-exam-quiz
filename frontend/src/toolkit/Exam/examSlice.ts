

import { createSlice  } from "@reduxjs/toolkit";
import { ISetQuestion, ISubmitQuestionsData } from "../../types/exam";



type TInitialState = {
    currentQuestion : null | ISetQuestion,
    mergedData: {},
    submitExamData: ISubmitQuestionsData[]
}

const initialState : TInitialState = {
    currentQuestion : null,
    mergedData : {},
    submitExamData: []
}

export const examSlice = createSlice({
    initialState,
    name: 'examSlice',
    reducers: {
        getCurrentQuestion : (state,action) => {
            const payload = action.payload
            state.currentQuestion = payload
        },
        getSubmitExamData : (state,action) => {
            const payload = action.payload;
            const { optionId, questionId } = payload;
            const existingIndex = state.submitExamData.findIndex(
              (data) => data.questionId === questionId
            );
          
            // Create a copy of the state to avoid mutation
            const updatedState = [...state.submitExamData];
          
            if (existingIndex !== -1) {
              // Update the existing object
              updatedState[existingIndex] = {
                questionId,
                optionId,
              };
            } else {
              updatedState.push({ questionId, optionId });
            }
            state.submitExamData = updatedState
        },
        reset : state => {
          state.currentQuestion = null
        }
    }
})

export const {getCurrentQuestion,reset,getSubmitExamData} = examSlice.actions