import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllUsers = createAsyncThunk('fetchAllUsers', async (props) => {
    const currentPage = props ? props.currentPage : 1
    const searchText = props ? props.searchText : null

    const url = `http://localhost:8080/users/users?page=${currentPage}&search=${searchText}`
    const res = await fetch(url, {
        headers: { Authorization: props.token }
    })

    const data = await res.json()

    if (res.status !== 200) {
        throw new Error(data.message)
    }
    return data
})


export const setAdmin = createAsyncThunk('setAdmin', async (props) => {
    const _id = props.updatedUser._id
    const updatedUser = props.updatedUser

    const url = `http://localhost:8080/users/user/${_id}?page=${props.currentPage}`
    const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(updatedUser),
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


export const deleteUser = createAsyncThunk('deleteUser', async (props) => {
    const resultId = props.deletingUser._id
    const url = `http://localhost:8080/users/user/${resultId}?page=${props.currentPage}`
    const res = await fetch(url, {
        method: 'DELETE',
        body: JSON.stringify(props.deletingUser),
        headers: { Authorization: props.token }
    })

    const data = await res.json()

    if (res.status !== 200 && res.status !== 201) {
        throw new Error(data.message)
    }
    return data
})

export const deleteAllUsers = createAsyncThunk('deleteAllUsers', async () => {
    const url = 'http://localhost:8080/users/users'
    const res = await fetch(url, {
        method: 'DELETE'
    })
    if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed to delete all users');
    }
})



const pickedUser = {
    _id: '',
    email: '',
    password: '',
    isAdmin: false,
    // username: '',
    // age: '',
    // mobile: '',
    // country: '',
    // city: '',
    // address: '',
    // postalCode: '',
}


const usersSlice = createSlice({
    name: 'users',

    initialState: {
        isUsersLoading: false,
        users: [],
        searchedUsers: [],
        paginatedUsers: [],
        pickedUser, // pass user data
        isOpenUpdateModal: false,
        usersSearch: '',
    },

    reducers: {
        toggleUserUpdate: (state, action) => {
            state.isOpenUpdateModal = !state.isOpenUpdateModal
        },
        toggleUsersMessage: (state, action) => {
            state.isOpen.messageModal = !state.isOpen.messageModal
        },

        setPickedUser: (state, action) => {
            state.pickedUser = action.payload ? action.payload : pickedUser
        },

    },

    extraReducers: builder => {
        builder
            .addCase(fetchAllUsers.pending, (state, action) => {
                state.isUsersLoading = true
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.isUsersLoading = false

                state.users = action.payload.users
                state.searchedUsers = action.payload.searchedUsers
                state.paginatedUsers = action.payload.paginatedUsers

            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.isUsersLoading = false
            })

            .addCase(setAdmin.pending, (state, action) => {
                state.isUsersLoading = true
            })
            .addCase(setAdmin.fulfilled, (state, action) => {
                state.isUsersLoading = false
                
                state.users = action.payload.users
                state.paginatedUsers = action.payload.paginatedUsers
            })
            .addCase(setAdmin.rejected, (state, action) => {
                state.isUsersLoading = false
            })

            .addCase(deleteUser.pending, (state, action) => {
                state.isUsersLoading = true
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isUsersLoading = false
                state.users = action.payload.users
                state.paginatedUsers = action.payload.paginatedUsers

            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isUsersLoading = false
            })

    }
})


export const {
    toggleUserUpdate,
    toggleUsersMessage,
    setPickedUser,
    setValidation,
} = usersSlice.actions


export default usersSlice.reducer


