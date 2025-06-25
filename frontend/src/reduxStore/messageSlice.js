import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: "message",
    initialState: {
        messages: [], // Initialize as empty array
    },
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload || []; // Ensure it's always an array
        },
        addMessage: (state, action) => {
            // Ensure messages is an array before pushing
            if (!Array.isArray(state.messages)) {
                state.messages = [];
            }
            state.messages.push(action.payload);
        },
        // Optional: clear messages reducer
        clearMessages: (state) => {
            state.messages = [];
        }
    }
});

export const { setMessages, addMessage, clearMessages } = messageSlice.actions;
export default messageSlice.reducer;