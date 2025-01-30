

import { createSlice  } from "@reduxjs/toolkit";
import { ISetQuestion } from "../../types/exam";




interface IInitialState {
    currentQuestion : ISetQuestion | null,
    submitExamData: Record<string,number>
}

const initialState : IInitialState = {
    currentQuestion : null,
    submitExamData: {}
}

export const examSlice = createSlice({
    initialState,
    name: 'examSlice',
    reducers: {
        handleCurrentQuestion : (state,action) => {
            const payload = action.payload
            state.currentQuestion = payload
        },
        handleSubmitExamData : (state,action) => {
            const payload = action.payload;
            state.submitExamData[payload.questionId] = payload.answerId
        },
        reset : state => {
          state.currentQuestion = null
        }
    }
})

export const {handleSubmitExamData,reset,handleCurrentQuestion} = examSlice.actions