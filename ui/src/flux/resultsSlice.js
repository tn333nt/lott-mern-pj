import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchAllResults = createAsyncThunk('fetchAllResults', async (props) => { // (action's prefix , cb)
    const url = `http://localhost:8080/results/results?page=${props.currentPage}&search=${props.searchText}`
    const res = await fetch(url) // data get from the next then block

    if (res.status !== 200) {
        throw new Error('Failed to fetch results');
    }

    const data = await res.json()
    return data
})


export const addResult = createAsyncThunk('addResult', async (props) => {
    const newResult = props.newResult

    const url = `http://localhost:8080/results/result?page=${props.currentPage}`
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(newResult),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    })

    if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed to create result');
    }

    const data = await res.json()
    return data

})

export const updateResult = createAsyncThunk('updateResult', async (props) => {
    const _id = props.updatedResult._id
    const updatedResult = props.updatedResult

    const url = `http://localhost:8080/results/result/${_id}?page=${props.currentPage}`
    const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(updatedResult),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    })

    if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed to update result');
    }

    const data = await res.json()
    return data
})


export const deleteResult = createAsyncThunk('deleteResult', async (props) => {
    const resultId = props.deletingResult._id
    const url = `http://localhost:8080/results/result/${resultId}?page=${props.currentPage}`
    const res = await fetch(url, {
        method: 'DELETE',
        body: JSON.stringify(props.deletingResult)
    })

    if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed to delete result');
    }
    const data = await res.json()
    return data
})

export const deleteAllResults = createAsyncThunk('deleteAllResults', async () => {
    const url = 'http://localhost:8080/results/results'
    const res = await fetch(url, {
        method: 'DELETE'
    })
    if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed to delete all results');
    }
})


const initialResult = {
    _id: '',
    date: '',
    jackpot: {
        reward: 30000,
        winningValues: [],
    },
    firstPrizes: {
        reward: 3000,
        winningValues: [],
    },
    secondPrizes: {
        reward: 1000,
        winningValues: [],
    },
    thirdPrizes: {
        reward: 500,
        winningValues: [],
    },
    fourthPrizes: {
        reward: 100,
        winningValues: [],
    },
    fifthPrizes: {
        reward: 50,
        winningValues: [],
    },
    sixthPrizes: {
        reward: 0,
        winningValues: [],
    },
    seventhPrizes: {
        reward: 0,
        winningValues: [],
    },
    eighthPrizes: {
        reward: 0,
        winningValues: [],
    }
}


const resultsSlice = createSlice({ // auto gen action creators & action types that correspond to the reducers and state
    name: 'results',

    initialState: {
        isLoading: false,
        results: [], // save all results
        searchedResults: [],
        paginatedResults: [], // results r rendered in each page
        pickedResult: initialResult,
        currentPage: 1,
        isUpdating: false,
        isOpen: {
            addModal: false,
            updateModal: false,
            messageModal: false
        },
        searchText: '', // final value to search
        message: '',
        confirm: ''
    },

    reducers: {
        toggleModalAdd: (state) => {
            if (!state.isOpen.addModal) {
                state.pickedResult = initialResult
            }
            state.isOpen.addModal = !state.isOpen.addModal
        },
        toggleModalUpdate: (state, action) => {
            state.isOpen.updateModal = !state.isOpen.updateModal
            state.isUpdating = !state.isUpdating
        },
        toggleModalMessage: (state, action) => {
            if (state.isOpen.messageModal) {
                state.message = ''
                state.confirm = ''
            }
            state.isOpen.messageModal = !state.isOpen.messageModal
            state.confirm = action.payload
        },

        setSearchText: (state, action) => {
            state.searchText = action.payload
        },
        setValues: (state, action) => {
            state.pickedResult = action.payload ? action.payload : initialResult
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

    extraReducers: builder => {
        builder
            .addCase(fetchAllResults.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchAllResults.fulfilled, (state, action) => {
                state.isLoading = false
                state.results = action.payload.results

                state.searchedResults = action.payload.searchedResults
                state.paginatedResults = action.payload.paginatedResults

            })
            .addCase(fetchAllResults.rejected, (state, action) => {
                state.isLoading = false
                state.isOpen.messageModal = true
                state.message = action.error.message
            })
            // C
            .addCase(addResult.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(addResult.fulfilled, (state, action) => {
                state.isLoading = false
                state.results = action.payload.results
                state.paginatedResults = action.payload.paginatedResults
            })
            .addCase(addResult.rejected, (state, action) => {
                state.isLoading = false
                state.isOpen.messageModal = true
                state.message = action.error.message
            })
            // U
            .addCase(updateResult.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(updateResult.fulfilled, (state, action) => {
                state.results = action.payload.results
                state.paginatedResults = action.payload.paginatedResults
                state.isLoading = false
            })
            .addCase(updateResult.rejected, (state, action) => {
                state.isLoading = false
                state.isOpen.messageModal = true
                state.message = action.error.message
            })
            // D
            .addCase(deleteResult.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(deleteResult.fulfilled, (state, action) => {
                state.isLoading = false
                state.isOpen.messageModal = true
                state.message = "delete successfully"
                state.results = action.payload.results
                state.paginatedResults = action.payload.paginatedResults
            })
            .addCase(deleteResult.rejected, (state, action) => {
                state.isLoading = false
                state.isOpen.messageModal = true
                state.message = action.error.message
            })
            .addCase(deleteAllResults.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(deleteAllResults.fulfilled, (state, action) => {
                state.isLoading = false
                state.isOpen.messageModal = true
                state.message = "deleted all"
                state.results = []
                state.paginatedResults = []
            })
            .addCase(deleteAllResults.rejected, (state, action) => {
                state.isLoading = false
                state.isOpen.messageModal = true
                state.message = action.error.message
            })
    }
})


export const {
    toggleModalAdd,
    toggleModalUpdate,
    toggleModalMessage,
    setSearchText,
    fetchPreviousPage,
    fetchNextPage,
    setValues
} = resultsSlice.actions


export default resultsSlice.reducer


