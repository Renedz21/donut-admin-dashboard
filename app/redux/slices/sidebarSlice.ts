import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface SidebarState {
    isOpen: boolean;
}


// Define the initial state using that type
const initialState: SidebarState = {
    isOpen: false,
}

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setIsOpen: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload
        },
    },
})

export const {
    setIsOpen,
} = sidebarSlice.actions
