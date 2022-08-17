import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { isNumberOrComma, length, required } from "../../util/validators";


export const fetchAllResults = createAsyncThunk('fetchAllResults', async (props) => { // (action's prefix , cb)
    const currentPage = props ? props.currentPage : 1
    const searchText = props ? props.searchText : null

    const url = `http://localhost:8080/results/results?page=${currentPage}&search=${searchText}`
    const res = await fetch(url, {
        headers: { Authorization: props.token }
    }) // data get from the next then block

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
            Authorization: props.token
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
    console.log(props, props)

    const url = `http://localhost:8080/results/result/${_id}?page=${props.currentPage}`
    const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(updatedResult),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: props.token
        }
    })

    console.log(res)

    if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed to update result');
    }

    const data = await res.json()
    return data
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
        isResultsLoading: false,
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
        confirm: '',
        validation: {
            jackpot: {
                isValid: false,
                // feedback: '',
                validators: [required, length({ exact: 6 }), isNumberOrComma]
            },
            firstPrizes: {
                isValid: false,
                // feedback: '',
                validators: [required, length({ exact: 20 }), isNumberOrComma]
            },
            secondPrizes: {
                isValid: false,
                // feedback: '',
                validators: [required, length({ exact: 17 }), isNumberOrComma]
            },
            thirdPrizes: {
                isValid: false,
                // feedback: '',
                validators: [required, length({ exact: 14 }), isNumberOrComma]
            },
            fourthPrizes: {
                isValid: false,
                // feedback: '',
                validators: [required, length({ exact: 11 }), isNumberOrComma]
            },
            fifthPrizes: {
                isValid: false,
                // feedback: '',
                validators: [required, length({ exact: 8 }), isNumberOrComma]
            },
        },
        isFormValid: false
    },

    reducers: {
        toggleModalAdd: (state) => {
            if (!state.isOpen.addModal) {
                state.pickedResult = initialResult
            }
            state.isOpen.addModal = !state.isOpen.addModal
            state.isUpdating = false
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
        setResult: (state, action) => {
            state.pickedResult = action.payload ? action.payload : initialResult
        },
        setValidation: (state, action) => {
            state.validation = action.payload.validation
            state.isFormValid = action.payload.isFormValid
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
                state.isResultsLoading = true
            })
            .addCase(fetchAllResults.fulfilled, (state, action) => {
                state.isResultsLoading = false
                state.results = action.payload.results

                state.searchedResults = action.payload.searchedResults
                state.paginatedResults = action.payload.paginatedResults

            })
            .addCase(fetchAllResults.rejected, (state, action) => {
                state.isResultsLoading = false
                state.isOpen.messageModal = true
                state.message = action.error.message
            })
            // C
            .addCase(addResult.pending, (state, action) => {
                state.isResultsLoading = true
            })
            .addCase(addResult.fulfilled, (state, action) => {
                state.isResultsLoading = false
                state.results = action.payload.results
                state.paginatedResults = action.payload.paginatedResults
            })
            .addCase(addResult.rejected, (state, action) => {
                console.log(action.error.message, 'action.error.message2')
                state.isResultsLoading = false
                state.isOpen.messageModal = true
                state.message = action.error.message
            })
            // U
            .addCase(updateResult.pending, (state, action) => {
                state.isResultsLoading = true
            })
            .addCase(updateResult.fulfilled, (state, action) => {
                state.isResultsLoading = false
                state.results = action.payload.results
                state.paginatedResults = action.payload.paginatedResults
            })
            .addCase(updateResult.rejected, (state, action) => {
                state.isResultsLoading = false
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
    setResult,
    setValidation
} = resultsSlice.actions


export default resultsSlice.reducer


