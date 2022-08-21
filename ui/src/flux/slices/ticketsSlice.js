import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const postTicket = createAsyncThunk('postTicket', async (props) => {
    const url = 'http://localhost:8080/tickets/ticket'
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json', Authorization: props.token },
        body: JSON.stringify(props.ticket)
    })

    console.log(res, 52806525369)
    const data = await res.json()
    if (res.status !== 200 && res.status !== 201) {
        console.log(data, 74161864198)
        throw new Error(data.message)
    }
    return data
})

export const deleteAllTickets = createAsyncThunk('deleteAllTickets', async (token) => {
    const url = 'http://localhost:8080/tickets/tickets'
    const res = await fetch(url, {
        method: 'DELETE',
        headers: { Authorization: token }
    })
    const data = res.json()
    if (res.status !== 200 && res.status !== 201) {
        // loi -ing
        console.log(data, 'data')
        throw new Error(data.message)
    }
    return data
})


const checkingTicket = {
    value: '',
    date: '',
    wonPrizes: []
}

const indexes = { // index of won value
    JP: -1, P1: -1, P2: -1,
    P3: -1, P4: -1, P5: -1
}

const ticketsSlice = createSlice({
    name: 'tickets',
    initialState: {
        checkingTicket,
        confirm: '',
        message: '', // Checked msg
        error: '', // Checking validation
        successText: '',
        failText: '',
        isLoading: false,
        indexes,
        searchedHistory: null,
        paginatedHistory: null,
    },
    reducers: {
        setTicket: (state, action) => {
            console.log(action.payload, 990985473)

            state.checkingTicket = action.payload ? action.payload : checkingTicket

        },

        setTicketsConfirm: (state, action) => {
            state.confirm = action.payload ? action.payload : ''
        },
        setCheckingError: (state, action) => {
            state.error = action.payload ? action.payload : ''
        },


        setCheckingMessage: (state, action) => {
            state.message = action.payload ? action.payload : ''
        },
        setCheckingSuccess: (state, action) => {
            state.successText = action.payload ? action.payload : ''
        },
        setCheckingFail: (state, action) => {
            state.failText = action.payload ? action.payload : ''
        },

        setIndexes: (state, action) => {
            state.indexes = action.payload ? action.payload : indexes
        },

        setSearchedHistory: (state, action) => {
            state.searchedHistory = action.payload ? action.payload : null
        },
        setPaginatedHistory: (state, action) => {
            state.paginatedHistory = action.payload ? action.payload : null
        },


    },
    extraReducers: builder => {
        builder

            .addCase(postTicket.pending, (state, action) => {
                state.isAuthLoading = true
            })
            .addCase(postTicket.fulfilled, (state, action) => {
                state.isAuthLoading = false
                // update after refresh page
                localStorage.setItem('user', JSON.stringify(action.payload.user))

            })
            .addCase(postTicket.rejected, (state, action) => {
                state.isAuthLoading = false
                state.error = action.error.message
            })

            .addCase(deleteAllTickets.pending, (state, action) => {
                state.isAuthLoading = true
            })
            .addCase(deleteAllTickets.fulfilled, (state, action) => {
                state.isAuthLoading = false
                localStorage.setItem('user', JSON.stringify(action.payload.user))

            })
            .addCase(deleteAllTickets.rejected, (state, action) => {
                state.isAuthLoading = false
            })


    }
})

export const {
    setTicket,
    setTicketsConfirm,
    setCheckingMessage,
    setCheckingError,
    setCheckingSuccess,
    setCheckingFail,
    setIndexes,
    setSearchedHistory,
    setPaginatedHistory,
} = ticketsSlice.actions

export default ticketsSlice.reducer