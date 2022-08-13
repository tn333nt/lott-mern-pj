import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const initialIndexes = { // index of won value
    JP: -1,
    P1: -1,
    P2: -1,
    P3: -1,
    P4: -1,
    P5: -1
}

const initialTicket = {
    value: '',
    date: '',
    wonPrize: ''
}

const ticketsSlice = createSlice({
    name: 'tickets',
    initialState: {
        checkingTicket: initialTicket,
        message: '',
        error: '',
        success: '',
        isLoading: false,
        indexes: initialIndexes
    },
    reducers: {
        setTicket: (state, action) => {
            console.log(action.payload, 'action.payload')
            const date = new Date(action.payload?.date)
            const updatedDate = date.toLocaleDateString("vi-VN")
            const ticket = {
                ...action.payload,
                date: updatedDate
            }

            state.checkingTicket = action.payload ? ticket : initialTicket

        },
        setMessage: (state, action) => {
            state.message = action.payload ? action.payload : ''
        },
        setError: (state, action) => {
            state.error = action.payload ? action.payload : ''
        },
        setSuccess: (state, action) => {
            state.success = action.payload ? action.payload : ''
        },
        setIndexes: (state, action) => {
            state.indexes = action.payload ? action.payload : initialIndexes
        }
    },
    // extraReducers: builder => {
    //     builder
    //         .addCase(deleteAllTickets.pending, (state, action) => {
    //             state.isLoading = true
    //         })
    //         .addCase(deleteAllTickets.fulfilled, (state, action) => {
    //             console.log(action.payload, 'action.payload')
    //             state.isLoading = false
    //             state.message = "deleted all"

    //         })
    //         .addCase(deleteAllTickets.rejected, (state, action) => {
    //             state.isLoading = false
    //             state.message = action.error.message
    //         })

    // }
})

export const {
    setTicket,
    setMessage,
    setError,
    setSuccess,
    setIndexes
} = ticketsSlice.actions

export default ticketsSlice.reducer