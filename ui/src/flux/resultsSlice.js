import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { results } from '../util/data'

// createAsyncThunk auto creates 3 actions based on prefix (arg 1) :
// + pending => just after send req , haven't return data yet
// + fulfilled
// + rejected

export const fetchAllResults = createAsyncThunk('results/getAll', async () => { // (action's prefix , cb)
    const url = ''
    const res = await fetch(url) // data get from the next then block
    const data = await res.json()
    return data
})

export const addResult = createAsyncThunk('results/post', async (newResult) => {
    const url = ''
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(newResult)
    })
    const data = await res.json()
    return data
})

export const updateResult = createAsyncThunk('results/post', async (updatedResult) => {
    const url = ''
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(updatedResult)
    })
    const data = await res.json()
    return data
})

export const deleteResult = createAsyncThunk('results/post', async (deletedResult) => {
    const url = ''
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(deletedResult)
    })
    const data = await res.json()
    return data
})


const resultsSlice = createSlice({ // auto gen action creators & action types that correspond to the reducers and state
    name: 'results',

    initialState: {
        isLoading: false,
        results: results,
        totalResults: 0,
        currentPage: 1,
        isUpdating: false,
        isOpen: {
            addModal: false,
            updateModal: false,
            errorModal: false
        },
        pickedResult: {
            jackpot: {
                reward: 0,
                winningValues: [],
            },
            firstPrizes: {
                reward: 0,
                winningValues: [],
            },
            secondPrizes: {
                reward: 0,
                winningValues: [],
            },
            thirdPrizes: {
                reward: 0,
                winningValues: [],
            },
            fourthPrizes: {
                reward: 0,
                winningValues: [],
            },
            fifthPrizes: {
                reward: 0,
                winningValues: [],
            },
        },
        searchText: '',
        error: null,
    },
    // 'slice reducers', will be passed to createReducer
    reducers: { 
        toggleModalAdd: (state) => {
            state.isOpen.addModal = !state.isOpen.addModal
        },
        toggleModalUpdate: (state, action) => {
            state.isOpen.updateModal = !state.isOpen.updateModal
            state.isUpdating = !state.isUpdating
            // state.pickedResult = action.payload
        },
        toggleModalError: (state) => {
            state.isOpen.errorModal = !state.isOpen.errorModal
        },

        // setLoading: (state, action) => {
        //     state.isLoading = action.payload
        // },
        setSearchText: (state, action) => {
            state.searchText = action.payload
        },
        setResult: (state, action) => {
            state.pickedResult = action.payload
        },

        fetchPreviousPage: (state) => {
            state.currentPage--
        },
        fetchNextPage: state => {
            state.currentPage++;
        },
        fetchExactPage: (state, action) => {
            state.currentPage = action.payload
        }
    },

    extraReducers: builder => { // allows createSlice to respond to other action types besides the types it has generated
        builder
            // 
            .addCase(fetchAllResults.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchAllResults.fulfilled, (state, action) => {
                state.isLoading = false
                state.results = action.payload
            })
            .addCase(fetchAllResults.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
            // 
            .addCase(addResult.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(addResult.fulfilled, (state, action) => {
                state.isLoading = false
                state.results.shift(action.payload)
            })
            .addCase(addResult.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
})


export const {
    toggleModalAdd,
    toggleModalUpdate,
    toggleModalError,
    setSearchText,
    fetchPreviousPage,
    fetchNextPage,
    setResult
} = resultsSlice.actions


export default resultsSlice.reducer


