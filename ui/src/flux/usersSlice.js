import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { isNumberOrComma, length, required } from "../util/validators";


export const fetchAllUsers = createAsyncThunk('fetchAllUsers', async (props) => {
    const url = `http://localhost:8080/users/users?page=${props.currentPage}&search=${props.searchText}`
    const res = await fetch(url)

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
        }
    })

    if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed to create user');
    }

    const data = await res.json()
    return data

})

export const updateUser = createAsyncThunk('updateUser', async (props) => {
    const _id = props.updatedResult._id
    const updatedResult = props.updatedResult

    const url = `http://localhost:8080/users/user/${_id}?page=${props.currentPage}`
    const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(updatedResult),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
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
        body: JSON.stringify(props.deletingUser)
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


const initialUser = {
    email: '',
    password: '',
    name: ''
}


const usersSlice = createSlice({
    name: 'users',

    initialState: {
        isLoading: false,
        users: [],
        searchedUsers: [],
        paginatedUsers: [],
        user: initialUser,
        currentPage: 1,
        isOpen: {
            updateModal: false,
            messageModal: false
        },
        searchText: '',
        message: '',
        confirm: '',
        validation: { },
        isFormValid: false
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
        setUser: (state, action) => {
            state.user = action.payload ? action.payload : initialUser
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
            .addCase(fetchAllUsers.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.users = action.payload.users

                state.searchedUsers = action.payload.searchedUsers
                state.paginatedUsers = action.payload.paginatedUsers

            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.isLoading = false
                state.isOpen.messageModal = true
                state.message = action.error.message
            })
           
            .addCase(addUser.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.users = action.payload.users
                state.paginatedUsers = action.payload.paginatedUsers
            })
            .addCase(addUser.rejected, (state, action) => {
                state.isLoading = false
                state.isOpen.messageModal = true
                state.message = action.error.message
            })
           
            .addCase(updateUser.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.users = action.payload.users
                state.paginatedUsers = action.payload.paginatedUsers
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false
                state.isOpen.messageModal = true
                state.message = action.error.message
            })
           
            .addCase(deleteUser.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isOpen.messageModal = true
                state.message = "delete successfully"

                state.users = action.payload.users
                state.paginatedUsers = action.payload.paginatedUsers

            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false
                state.isOpen.messageModal = true
                state.message = action.error.message
            })

            .addCase(deleteAllUsers.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(deleteAllUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isOpen.messageModal = true
                state.message = "deleted all"

                state.users = []
                state.paginatedUsers = []

            })
            .addCase(deleteAllUsers.rejected, (state, action) => {
                state.isLoading = false
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
    setUser,
    setValidation
} = usersSlice.actions


export default usersSlice.reducer


