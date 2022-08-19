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
    console.log(props, 'props')

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
    if (res.status === 422) {
        console.log(data, 'data')
        const err = new Error(data.message)
        // it does not take => no way to distinguish 
        // => going to convert all formfeedback -> alert 
        // or keep fe validation to check onchange
        // and be validation to replace isFormValid

        // err.param = data.param
        // err.validation = data.message
        throw err
    }
    if (res.status !== 200 && res.status !== 201) {
        throw new Error(data.message)
    }
    return data
})


const pickedResult = {
    // later : de nguyen = coming data
    _id: '',
    date: '',
    jackpot: {
        reward: 30000, // hardcoded here
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

// const validation = {
//     jackpot: '',
//     firstPrizes: '',
//     secondPrizes: '',
//     thirdPrizes: '',
//     fourthPrizes: '',
//     fifthPrizes: '',
// }
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
        pickedResult,
        currentPage: 1,
        isUpdating: false,
        isOpen: {
            addModal: false,
            updateModal: false,
            messageModal: false
        },
        searchText: '', // final value to search
        message: '', // notification or sys err
        confirm: '',
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
        closeResultsMessage: (state, action) => {
            // clear old data first
            if (state.isOpen.messageModal) {
                state.message = ''
                state.confirm = ''
            }
            // close msg modal, clear conf & msg
            // vi msg deu la tu he thong => only need to close
            // va tach rieng set conf ra ==
            state.isOpen.messageModal = !state.isOpen.messageModal
        },

        setSearchText: (state, action) => {
            state.searchText = action.payload
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
        setResultsConfirm: (state, action) => {
            state.confirm = action.payload ? action.payload : ''
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
                const { results, searchedResults, paginatedResults } = action.payload

                state.isResultsLoading = false
                state.results = results
                state.searchedResults = searchedResults
                state.paginatedResults = paginatedResults

            })
            .addCase(fetchAllResults.rejected, (state, action) => {
                state.isResultsLoading = false
                // loi he thong
                state.isOpen.messageModal = true
                state.message = action.error.message
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

                console.log(action.error, 'action.error')
                // console.log(action.error.param, 'action.error.param')
                // const message = action.error.message
                // const param = action.error.param
                // const validation = action.error.validation
                // if (message==='') {
                // loi update thi chac toan 422 thoi nen ko can modal
                // state.isOpen.messageModal = true
                state.error = action.error.message
                // } else {
                // console.log(state.validation[param], 'state.validation[param]')
                // console.log(state.validation[`${param}`], 'state.validation[`{param}`]')
                // state.validation[param] = validation
                // }
            })
    }
})


export const {
    toggleModalAdd,
    toggleModalUpdate,
    closeResultsMessage,
    setSearchText,
    fetchPreviousPage,
    fetchNextPage,
    setPickedResult,
    setValidation,
    setResultError,
    setResultsConfirm
} = resultsSlice.actions


export default resultsSlice.reducer


