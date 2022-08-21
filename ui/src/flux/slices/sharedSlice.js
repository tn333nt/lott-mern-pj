import { createSlice } from '@reduxjs/toolkit'

const sharedSlice = createSlice({
    name: 'shared',
    initialState: {
        searchText: '', // luu chung changing search text
        isOpenModal: false, // luu chung modal to show up
        currentPage: 1, // luu chung page ban dau
    },
    reducers: {

        setSearchText: (state, action) => {
            state.searchText = action.payload
        },
        toggleModal: (state, action) => {
            state.isOpenModal = !state.isOpenModal
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
        }

    }
})

export const {
    setSearchText,
    toggleModal,
    clearCurrentPage,
    fetchPreviousPage,
    fetchNextPage,
    fetchExactPage,
} = sharedSlice.actions

export default sharedSlice.reducer