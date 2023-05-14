import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/authSlice'
import { sidebarSlice } from './slices/sidebarSlice'


export const store = configureStore({
    reducer: {
        authReducer: authSlice.reducer,
        sidebarReducer: sidebarSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch