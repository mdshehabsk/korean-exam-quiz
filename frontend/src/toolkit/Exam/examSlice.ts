

import { createSlice  } from "@reduxjs/toolkit";
import { ISetQuestions } from "@types/exam";



type TInitialState = {
    currentQuestion : null | ISetQuestions
}

const initialState : TInitialState = {
    currentQuestion : null
}

export const examSlice = createSlice({
    initialState,
    name: 'examSlice',
    reducers: {
        getCurrentQuestion : (state,action) => {
            const payload = action.payload
            state.currentQuestion = payload
        },
        reset : state => {
          state.currentQuestion = null
        }
    }
})

export const {getCurrentQuestion,reset} = examSlice.actions