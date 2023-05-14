import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface AuthState {
    jwt: string;
    user: any;
}

const ls = typeof window !== 'undefined' ? window.localStorage : null

// Define the initial state using that type
const initialState: AuthState = {
    jwt: ls?.getItem('jwt') || '',
    user: ls?.getItem('user') || '{}',
}

export const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setUserAndJwt: (state, action: PayloadAction<any>) => {
            state.jwt = action.payload.token
            state.user = action.payload.others
            ls?.setItem('jwt', action.payload.token)
            ls?.setItem('user', JSON.stringify(action.payload.others))
        }
    },
})

export const {
    setUserAndJwt,
} = authSlice.actions
