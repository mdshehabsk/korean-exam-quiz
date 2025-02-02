import { createSlice } from "@reduxjs/toolkit";
import { ISet } from "../../types/exam";

interface IInitialState {
  currentSet: ISet;
}

const initialState: IInitialState = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  currentSet: {},
};

export const setSlice = createSlice({
  initialState,
  name: "setSlice",
  reducers: {
    handleCurrentCachedSet: (state, action) => {
      state.currentSet = action.payload;
    },
  },
});

export const { handleCurrentCachedSet } = setSlice.actions;
