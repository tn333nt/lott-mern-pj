import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const deleteAllTickets = createAsyncThunk('deleteAllTickets', async () => {
    const url = 'http://localhost:8080/tickets/tickets'
    const res = await fetch(url, {
        method: 'DELETE'
    })
    if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed to delete all users');
    }
})

// tu h : ticket = 1 ve 6 num , value = nums in 1 ve (can be 2-6)
const ticketsSlice = createSlice({
    name: 'tickets',
    initialState: {
        checkingTicket: {
            value: '',
            date: ''
        },
        message: '',
        error: '',
        isWon: '',
        winningValue: '',
        isLoading: false,
        indexes: { // index of won value
            JP: -1,
            P1: -1,
            P2: -1,
            P3: -1,
            P4: -1,
            P5: -1
        }
    },
    reducers: {
        setTicket: (state, action) => {
            const date = new Date(action.payload.date)
            const updatedDate = date.toLocaleDateString("vi-VN")
            console.log(action.payload, 'action.payload')
            console.log(updatedDate, 'date')

            state.checkingTicket = {
                ...action.payload,
                date: updatedDate
            }

            console.log(state.checkingTicket, 'state.checkingTicket')

        },
        setMessage: (state, action) => {
            state.message = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        setIndexes: (state, action) => {
            state.indexes = action.payload
        }
    }
})

export const {
    setTicket,
    setMessage,
    setError,
    setIndexes
} = ticketsSlice.actions

export default ticketsSlice.reducer