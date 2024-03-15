import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebarShow: false
}

const adminSidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        sidebarOpen : state => { state.sidebarShow = true },
        sidebarClose : state => {state.sidebarShow = false}
    }
})

export default adminSidebarSlice;

export const {sidebarClose,sidebarOpen} = adminSidebarSlice.actions