// import store from './store'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {fetchAllResults} from './test'

// createAsyncThunk auto creates 3 actions based on prefix (arg 1) :
// + pending => just after send req , haven't return data yet
// + fulfilled
// + rejected

// const currentPage = store.getState(currentPage)

// how to pass state outside of createSlice ???
export const fetchAllResults = createAsyncThunk('fetchAllResults', async (props) => { // (action's prefix , cb)
    console.log(props.searchText, 'props')
    const url = `http://localhost:8080/results/results?page=${props.currentPage}&search=${props.searchText}`
    const res = await fetch(url) // data get from the next then block
    if (res.status !== 200) {
        throw new Error('Failed to fetch results');
    }
    const data = await res.json()
    console.log(data, 90909);

    return data
})


export const addResult = createAsyncThunk('addResult', async (props) => {
    const newResult = props.newResult

    console.log(newResult, 'dfuajfda')
    const url = `http://localhost:8080/results/result?page=${props.currentPage}`
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(newResult),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    })
    console.log(res)
    if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed to create result');
    }
    const data = await res.json()
    console.log(data, 'data')

    console.log(JSON.stringify(data), 'JSON.stringify(data)')

    return data

})

export const updateResult = createAsyncThunk('updateResult', async (props) => {
    const _id = props.updatedResult._id
    const updatedResult = props.updatedResult

    console.log(updatedResult.firstPrizes.winningValues, 'updatedResult._id')

    console.log(JSON.stringify(updatedResult), 'JSON.stringify(updatedResult)') // :)) copy gui o TC thi dc, gui tu ui thi ko ? lol

    const url = `http://localhost:8080/results/result/${_id}?page=${props.currentPage}`
    const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(updatedResult),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    })
    // thu cai cuoi cung co the nghi den lol
    // sao may cho khac co can dau ma o day cu phai co header moi update dc ?
    // hinh nhu ko phai ko can ma all deu can
    // hqua co case xoa header cho post di moi chay binh thuong ma nhi
    console.log(res)

    if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed to update result');
    }
    
    const data = await res.json()
    console.log(data, 'data')
    return data
})


export const deleteResult = createAsyncThunk('deleteResult', async (props) => {
    const resultId = props.deletingResult._id
    console.log(resultId, 'props.deletingResult');
    const url = `http://localhost:8080/results/result/${resultId}?page=${props.currentPage}`
    const res = await fetch(url, {
        method: 'DELETE',
        body: JSON.stringify(props.deletingResult)
    })

    if (res.status !== 200 && res.status !== 201) {
        const err = new Error('Failed to delete result');
        console.log(err, 'err')
        throw err
    }
    const data = await res.json()
    // console.log(data, 'data')
    // return resultId
    return data
})

export const deleteAllResults = createAsyncThunk('deleteAllResults', async () => {
    const url = 'http://localhost:8080/results/results'
    const res = await fetch(url, {
        // method: 'DELETE'
        method: 'POST'
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
        searchedResults: [], // results r rendered in each page
        paginatedResults: [], // results r rendered in each page
        pickedResult: initialResult,
        // totalResults: 0,
        currentPage: 1,
        isUpdating: false,
        isOpen: {
            addModal: false,
            updateModal: false,
            messageModal: false
        },
        // winningValues: {
        //     jackpot: null,
        //     firstPrizes: null,
        //     secondPrizes: null,
        //     thirdPrizes: null,
        //     fourthPrizes: null,
        //     fifthPrizes: null,
        // },
        searchText: '',
        message: '',
        confirm: ''
    },
    // 'slice reducers', will be passed to createReducer
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

            // if (state.isUpdating) {
            //     state.pickedResult = action.payload
            // } else {
            //     state.pickedResult = {...state.pickedResult}
            // }

            // if (action.payload) {
            //     state.pickedResult.jackpot.winningValues = action.payload.jackpot.winningValues
            //     state.pickedResult.firstPrizes.winningValues = action.payload.firstPrizes.winningValues
            // } else {
            //     state.pickedResult = null
            // }
            // state.pickedResult = action.payload ? action.payload : { ...state.pickedResult }

        },
        toggleModalMessage: (state, action) => {
            if (state.isOpen.messageModal) {
                state.message = ''
                state.confirm = ''
            }
            state.isOpen.messageModal = !state.isOpen.messageModal
            state.confirm = action.payload
        },

        // setLoading: (state, action) => {
        //     state.isLoading = action.payload
        // },
        setSearchText: (state, action) => {
            state.searchText = action.payload
        },
        setValues: (state, action) => {
            
            // if (action.payload) {
            //     // console.log('lol')
            //     // const test = action.payload.firstPrizes.winningValues[0].split(',')
            //     // const arr = []
            //     // test.forEach((t,i) => {
            //     //     arr.push(t.trim())
            //     // })
            //     // console.log(test, 'test')
            //     // console.log(arr, 'arr')

            //     // state.pickedResult.firstPrizes.winningValues = arr
            // } else {
            //     state.pickedResult = initialResult
            // }
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

    extraReducers: builder => { // allows createSlice to respond to other action types besides the types it has generated
        builder
            // 
            .addCase(fetchAllResults.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchAllResults.fulfilled, (state, action) => {
                // console.log(action.payload.results.length)
                state.isLoading = false
                state.results = action.payload.results

                // if (action.payload.searchedResults) {
                state.searchedResults = action.payload.searchedResults
                // } else {
                state.paginatedResults = action.payload.paginatedResults
                // }

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
                console.log(action.payload, 'action.payload.')

                state.isLoading = false
                // state.results.unshift(action.payload)
                // state.paginatedResults.unshift(action.payload)

                state.results = action.payload.results
                state.paginatedResults = action.payload.paginatedResults

                console.log(state.paginatedResults, 'state.paginatedResults.')

                // state.results.concat(action.payload)
            })
            .addCase(addResult.rejected, (state, action) => {
                console.log(action.error, 'action.payload.')
                state.isLoading = false
                state.isOpen.messageModal = true
                state.message = action.error.message
            })
            // U
            .addCase(updateResult.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(updateResult.fulfilled, (state, action) => {
                // const resultIndex = state.results.findIndex(
                //     result => result._id === state.pickedResult._id
                // );
                // const paginatedResultIndex = state.paginatedResults.findIndex(
                //     result => result._id === state.pickedResult._id
                // );

                // state.results[resultIndex] = action.payload;
                // state.paginatedResults[paginatedResultIndex] = action.payload;

                state.results = action.payload.results
                state.paginatedResults = action.payload.paginatedResults
                state.isLoading = false
                // state.pickedResult = initialResult
            })
            .addCase(updateResult.rejected, (state, action) => {
                state.isLoading = false
                // state.pickedResult = initialResult
                state.isOpen.messageModal = true
                state.message = action.error.message
            })
            // D
            .addCase(deleteResult.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(deleteResult.fulfilled, (state, action) => {
                console.log('ok')
                // const updatedResults = state.results.filter(result => result._id !== action.payload._id);
                // const updatedPaginatedResults = state.paginatedResults.filter(result => result._id !== action.payload._id);

                // state.results = updatedResults
                // state.paginatedResults = updatedPaginatedResults

                // const resultIndex = state.results.findIndex(
                //     result => result._id === action.payload
                // );
                // const paginatedResultIndex = state.paginatedResults.findIndex(
                //     result => result._id === action.payload
                // );

                // state.results.splice(resultIndex, 1)
                // state.paginatedResults.splice(paginatedResultIndex, 1)

                state.results = action.payload.results
                state.paginatedResults = action.payload.paginatedResults
                console.log(action.payload.results, 'action.payload.results');
                console.log(action.payload.paginatedResults, 'action.payload.paginatedResults');
                state.isLoading = false
                state.isOpen.messageModal = true
                state.message = "delete successfully"
            })
            .addCase(deleteResult.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.error.message
            })
            .addCase(deleteAllResults.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(deleteAllResults.fulfilled, (state, action) => {
                state.results = []
                state.paginatedResults = []
                state.isLoading = false
                state.isOpen.messageModal = true
                state.message = "deleted all"
            })
            .addCase(deleteAllResults.rejected, (state, action) => {
                state.isLoading = false
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


