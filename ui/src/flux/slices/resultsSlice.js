import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { isNumberOrComma, length, required } from "../../util/validators";


export const fetchAllResults = createAsyncThunk('fetchAllResults', async (props) => { // (action's prefix , cb)
    const currentPage = props ? props.currentPage : 1
    const searchText = props ? props.searchText : null

    const url = `http://localhost:8080/results/results?page=${currentPage}&search=${searchText}`
    const res = await fetch(url, {
        headers: { Authorization: props.token }
    }) // data get from the next then block

    const data = await res.json()
    if (res.status !== 200) {
        throw new Error(data.message)
    }
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
            Authorization: props.token
        }
    })

    const data = await res.json()

    if (res.status !== 200 && res.status !== 201) {
        throw new Error(data.message)
    }
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
            Authorization: props.token
        }
    })

    const data = await res.json()

    if (res.status !== 200 && res.status !== 201) {
        throw new Error(data.message)
    }
    return data
})


const pickedResult = {
    date: '',
    jackpot: {
        winningValues: [],
    },
    firstPrizes: {
        winningValues: [],
    },
    secondPrizes: {
        winningValues: [],
    },
    thirdPrizes: {
        winningValues: [],
    },
    fourthPrizes: {
        winningValues: [],
    },
    fifthPrizes: {
        winningValues: [],
    },
    sixthPrizes: {
        winningValues: [],
    },
    seventhPrizes: {
        winningValues: [],
    },
    eighthPrizes: {
        winningValues: [],
    }
}

const validation = {
    jackpot: {
        isValid: null,
        validators: [required, length({ exact: 6 }), isNumberOrComma]
    },
    firstPrizes: {
        isValid: null,
        validators: [required, length({ exact: 20 }), isNumberOrComma]
    },
    secondPrizes: {
        isValid: null,
        validators: [required, length({ exact: 17 }), isNumberOrComma]
    },
    thirdPrizes: {
        isValid: null,
        validators: [required, length({ exact: 14 }), isNumberOrComma]
    },
    fourthPrizes: {
        isValid: null,
        validators: [required, length({ exact: 11 }), isNumberOrComma]
    },
    fifthPrizes: {
        isValid: null,
        validators: [required, length({ exact: 8 }), isNumberOrComma]
    },
}


const resultsSlice = createSlice({ // auto gen action creators & action types that correspond to the reducers and state
    name: 'results',

    initialState: {
        isResultsLoading: false,
        results: [], // save all results
        searchedResults: [],
        paginatedResults: [], // results r rendered in each page
        pickedResult, // temporary data to work with (add/update/passing...)
        isUpdating: false,
        isOpen: {
            addModal: false,
            updateModal: false,
        },
        error: '', // validation err
        validation,
    },

    reducers: {
        toggleModalAdd: (state) => {
            state.isOpen.addModal = !state.isOpen.addModal
            state.isUpdating = false
        },
        toggleModalUpdate: (state, action) => {
            state.isOpen.updateModal = !state.isOpen.updateModal
            state.isUpdating = !state.isUpdating
        },

        setPickedResult: (state, action) => {
            state.pickedResult = action.payload ? action.payload : pickedResult
        },

        setValidation: (state, action) => {
            state.validation = action.payload ? action.payload : validation
        },
        setResultError: (state, action) => {
            state.error = action.payload ? action.payload : ''
        },

    },

    extraReducers: builder => {
        builder
            .addCase(fetchAllResults.pending, (state, action) => {
                state.isResultsLoading = true
            })
            .addCase(fetchAllResults.fulfilled, (state, action) => {
                const { results, searchedResults, paginatedResults } = action.payload

                state.isResultsLoading = false
                state.results = results
                state.searchedResults = searchedResults
                state.paginatedResults = paginatedResults

            })
            .addCase(fetchAllResults.rejected, (state, action) => {
                state.isResultsLoading = false
            })

            .addCase(addResult.pending, (state, action) => {
                state.isResultsLoading = true
            })
            .addCase(addResult.fulfilled, (state, action) => {
                const { results, paginatedResults } = action.payload

                state.isResultsLoading = false
                state.results = results
                state.paginatedResults = paginatedResults
            })
            .addCase(addResult.rejected, (state, action) => {
                state.isResultsLoading = false
                state.error = action.error.message
            })

            .addCase(updateResult.pending, (state, action) => {
                state.isResultsLoading = true
            })
            .addCase(updateResult.fulfilled, (state, action) => {
                const { results, paginatedResults } = action.payload

                state.isResultsLoading = false
                state.results = results
                state.paginatedResults = paginatedResults
            })
            .addCase(updateResult.rejected, (state, action) => {
                state.isResultsLoading = false
                state.error = action.error.message
            })
    }
})


export const {
    toggleModalAdd,
    toggleModalUpdate,
    setPickedResult,
    setValidation,
    setResultError,
} = resultsSlice.actions


export default resultsSlice.reducer


