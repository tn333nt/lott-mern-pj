import { createSlice } from '@reduxjs/toolkit'

const sharedSlice = createSlice({
    name: 'shared',
    initialState: {
        isOpenModal: false, // luu chung modal to show up
        currentPage: 1, // luu chung page ban dau
        searchText: '', // luu chung changing search text
        message: '', // thong bao 
        confirm: '', // text xac nhan req
    },
    reducers: {
        toggleModal: (state, action) => {
            state.isOpenModal = !state.isOpenModal
        },
        setMessage: (state, action) => {
            state.message = action.payload ? action.payload : '' 
        },
        setConfirm: (state, action) => {
            // nay bi do la do ko dong nhat kieu clear => conf undefined nen clash vs '' mb
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