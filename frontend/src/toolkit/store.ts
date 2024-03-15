import { configureStore } from '@reduxjs/toolkit'

import adminSidebarSlice from './Admin/AdminSidebarSlice'
import baseApi from './utils/baseApi'

export const store = configureStore({
  reducer: {
    adminSidebar: adminSidebarSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer
  },
  middleware: GDK => GDK().concat(baseApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch