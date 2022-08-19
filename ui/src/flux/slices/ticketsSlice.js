import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const checkingTicket = {
    value: '',
    date: '',
    wonPrize: ''
}

const indexes = { // index of won value
    JP: -1,
    P1: -1,
    P2: -1,
    P3: -1,
    P4: -1,
    P5: -1
}

const ticketsSlice = createSlice({
    name: 'tickets',
    initialState: {
        checkingTicket,
        confirm: '',
        message: '', // modal
        error: '', // red
        successText: '', //green
        failText: '', // yellow
        isLoading: false,
        indexes,
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

            state.checkingTicket = action.payload ? ticket : checkingTicket

        },
        setTicketsConfirm: (state, action) => {
            state.confirm = action.payload ? action.payload : ''
        },


        setCheckingMessage: (state, action) => {
            state.message = action.payload ? action.payload : ''
        },
        setCheckingError: (state, action) => {
            state.error = action.payload ? action.payload : ''
        },

        setCheckingSuccess: (state, action) => {
            console.log(action.payload, 'action.payload')
            state.successText = action.payload ? action.payload : ''
        },
        setCheckingFail: (state, action) => {
            state.failText = action.payload ? action.payload : ''
        },

        setIndexes: (state, action) => {
            state.indexes = action.payload ? action.payload : indexes
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
    setTicketsConfirm,
    setCheckingMessage,
    setCheckingError,
    setCheckingSuccess,
    setCheckingFail,
    setIndexes
} = ticketsSlice.actions

export default ticketsSlice.reducer