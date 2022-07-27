import { createSlice } from "@reduxjs/toolkit";

import { results } from '../data'


const resultsSlice = createSlice({
    name : 'results',
    initialState : {
        isOpen : {
            modalAdd : false,
            modalUpdate : false
        },
        results : results
    },
    reducers : {
        // action creators
        toggleModalAdd : (state) => {
            state.isOpen.modalAdd = !state.isOpen.modalAdd
        },
        toggleModalUpdate : (state) => {
            state.isOpen.modalUpdate = !state.isOpen.modalUpdate
        },
        addResult : (state, action) => {
            state.results.push(action.payload)
        },
        updateResult : (state, action) => {},
        deleteResult : (state, action) => {},
        searchResult : (state, action) => {}
    }
})

export const { toggleModalAdd, toggleModalUpdate } = resultsSlice.actions

export default resultsSlice.reducer


