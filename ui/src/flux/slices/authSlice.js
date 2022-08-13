import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const resetPassword = createAsyncThunk('resetPassword', async (email) => {
    const url = "http://localhost:8080/auth/resetPassword"
    const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({ email: email }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

    if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed to reset')
    }
})

export const handleSingup = createAsyncThunk('handleSingup', async (authData) => {

    const url = "http://localhost:8080/auth/signup"

    const res = await fetch(url, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(authData)
    })

    if (res.status === 422) {
        throw new Error("Make sure the email address isn't used yet")
    }

    if (res.status !== 200) {
        throw new Error('Failed to create account');
    }

    const data = await res.json()
    return data
})


export const handleLogin = createAsyncThunk('handleLogin', async (authData) => {
    const url = "http://localhost:8080/auth/login"

    const res = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(authData)
    })

    if (res.status === 422) {
        throw new Error("Validation failed")
    }

    if (res.status !== 200) {
        throw new Error('Failed to authenticate user');
    }

    const data = await res.json()

    return data
})

// tam de ben nay de tien cap nhat user
export const postTicket = createAsyncThunk('postTicket', async (props) => {
    const url = 'http://localhost:8080/tickets/ticket'
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json', Authorization: props.token },
        body: JSON.stringify(props.ticket)
    })
    if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed to add new check')
    }
    const data = res.json()
    return data
})

export const deleteAllTickets = createAsyncThunk('deleteAllTickets', async (token) => {
    const url = 'http://localhost:8080/tickets/tickets'
    const res = await fetch(url, {
        method: 'DELETE',
        headers: { Authorization: token }
    })
    if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed to delete all users');
    }
    const data = res.json()
    return data
})

export const changePassword = createAsyncThunk('changePassword', async (authData) => {
    const url = "http://localhost:8080/users/changePassword"
    const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(authData),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: authData.token
        }
    })

    if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed to reset')
    }

    const data = await res.json()
    return data
})


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        token: null,
        user: null,
        isLoading: false,
        error: null // later
    },
    reducers: {
        // setAutoLogout: (state, action) => {
        //     // later : set expiredate
        // },
        handleLogout: (state, action) => {
            state.isAuth = false
            state.token = null
            state.user = null
        },
        setError: (state, action) => {
            state.error = null
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(handleSingup.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(handleSingup.fulfilled, (state, action) => {
                state.isAuth = false
                state.isLoading = false
            })
            .addCase(handleSingup.rejected, (state, action) => {
                state.isAuth = false
                state.isLoading = false
                state.error = action.error
            })
            .addCase(handleLogin.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(handleLogin.fulfilled, (state, action) => {
                state.isAuth = true
                state.isLoading = false
                state.token = action.payload.token
                state.user = action.payload.user

            })
            .addCase(handleLogin.rejected, (state, action) => {
                state.isAuth = false
                state.isLoading = false
                state.error = action.error
            })

            .addCase(changePassword.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.user = action.payload.user
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error
            })

            .addCase(postTicket.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(postTicket.fulfilled, (state, action) => {
                console.log(action.payload, 'action.payload')
                state.isLoading = false
                state.user = action.payload.user
            })
            .addCase(postTicket.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.error.message
            })
            .addCase(deleteAllTickets.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(deleteAllTickets.fulfilled, (state, action) => {
                console.log(action.payload, 'action.payload')
                console.log(action.payload.user, 'action.payload')
                state.isLoading = false
                state.user = action.payload.user
                state.message = "deleted all"

            })
            .addCase(deleteAllTickets.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.error.message
            })


    }
})

export const {
    handleLogout,
    setAutoLogout,
    setError,
    setUser
} = authSlice.actions

export default authSlice.reducer