import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllUsers = createAsyncThunk('fetchAllUsers', async (props) => {
    const currentPage = props ? props.currentPage : 1
    const searchText = props ? props.searchText : null

    const url = `http://localhost:8080/users/users?page=${currentPage}&search=${searchText}`
    const res = await fetch(url, {
        headers: { Authorization: props.token }
    })

    if (res.status !== 200) {
        throw new Error('Failed to fetch users');
    }

    const data = await res.json()
    return data
})


export const addUser = createAsyncThunk('addUser', async (props) => {
    const newUser = props.newUser

    const url = `http://localhost:8080/users/user?page=${props.currentPage}`
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: props.token
        }
    })

    if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed to create user');
    }

    const data = await res.json()
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

    if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed to update user');
    }

    const data = await res.json()
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

    if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed to delete user');
    }
    const data = await res.json()
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
    email: '',
    password: '',
    isAdmin: false,
    name: '',
    mobile: '',
}


const usersSlice = createSlice({
    name: 'users',

    initialState: {
        isUsersLoading: false,
        users: [],
        searchedUsers: [],
        paginatedUsers: [],
        pickedUser,
        currentPage: 1,
        isOpen: {
            updateModal: false,
            messageModal: false
        },
        searchText: '',
        message: '',
        confirm: ''
    },

    reducers: {
        toggleModalUpdate: (state, action) => {
            state.isOpen.updateModal = !state.isOpen.updateModal
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
        setPickedUser: (state, action) => {
            state.pickedUser = action.payload ? action.payload : pickedUser
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
        test: (state, action) => {
            alert('alo')
            console.log(235619256295629)
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
                state.isOpen.messageModal = true
                state.message = action.error.message
            })
           
            .addCase(addUser.pending, (state, action) => {
                state.isUsersLoading = true
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.isUsersLoading = false
                state.users = action.payload.users
                state.paginatedUsers = action.payload.paginatedUsers
            })
            .addCase(addUser.rejected, (state, action) => {
                state.isUsersLoading = false
                state.isOpen.messageModal = true
                state.message = action.error.message
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
                state.isOpen.messageModal = true
                state.message = action.error.message
            })
           
            .addCase(deleteUser.pending, (state, action) => {
                state.isUsersLoading = true
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isUsersLoading = false
                state.isOpen.messageModal = true
                state.message = "delete successfully"

                state.users = action.payload.users
                state.paginatedUsers = action.payload.paginatedUsers

            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isUsersLoading = false
                state.isOpen.messageModal = true
                state.message = action.error.message
            })
            .addCase(deleteAllUsers.pending, (state, action) => {
                state.isUsersLoading = true
            })
            .addCase(deleteAllUsers.fulfilled, (state, action) => {
                state.isUsersLoading = false
                state.isOpen.messageModal = true
                state.message = "deleted all"

                state.users = []
                state.paginatedUsers = []

            })
            .addCase(deleteAllUsers.rejected, (state, action) => {
                state.isUsersLoading = false
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
    setPickedUser,
    setValidation,
    test
} = usersSlice.actions


export default usersSlice.reducer


