import { createSlice } from '@reduxjs/toolkit'

const sharedSlice = createSlice({
    name: 'shared',
    initialState: {
        // luu chung :
        isOpenModal: false, // modal -> show up
        currentPage: 1, // initial page
        searchText: '', // changing search text
        message: '', // thong bao cho res
        confirm: '', // text xac nhan (delete) req
    },
    reducers: {
        toggleModal: (state, action) => {
            state.isOpenModal = !state.isOpenModal
        },
        setMessage: (state, action) => {
            state.message = action.payload ? action.payload : '' 
        },
        setConfirm: (state, action) => {
            state.confirm = action.payload ? action.payload : '' 
        },


        setSearchText: (state, action) => {
            state.searchText = action.payload
        },
        clearSearchText: (state) => {
            state.searchText = ''
        },
        

        clearCurrentPage: (state) => {
            state.currentPage = 1
        },
        fetchPreviousPage: (state) => {
            state.currentPage--
        },
        fetchNextPage: state => {
            state.currentPage++;
        },
        fetchExactPage: (state, action) => {
            state.currentPage = action.payload
        },


    }
})

export const {
    toggleModal,
    setMessage,
    setConfirm,
    setSearchText,
    clearSearchText,
    clearCurrentPage,
    fetchPreviousPage,
    fetchNextPage,
    fetchExactPage,
} = sharedSlice.actions

export default sharedSlice.reducer