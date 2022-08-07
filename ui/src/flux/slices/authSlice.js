import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const resetPassword = createAsyncThunk('resetPassword', async (email) => {
    console.log(JSON.stringify({email:email}), 'JSON.stringify(email)')
    const url = "http://localhost:8080/auth/resetPassword"
    const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({email:email}),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

    console.log(res, 'resetpw')

    if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed to reset')
    }

    const data = await res.json()
    console.log(data, 'data')
    return data
})

export const handleSingup = createAsyncThunk('handleSingup', async (authData) => {

    const url = "http://localhost:8080/auth/signup"
    
    const res = await fetch(url, {
        method: 'PUT',
        headers: { 'content-type': 'application/json'},
        body: JSON.stringify(authData)
    })
    console.log(res)
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
    console.log(res)
    if (res.status === 422) {
        throw new Error("Validation failed")
    }

    if (res.status !== 200) {
        throw new Error('Failed to authenticate user');
    }

    const data = await res.json()
    console.log(data)

    return data
})


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        token: null,
        user: null,
        isLoading: false,
        error: null // chua dung dc den
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
        // resetPassword: (state, action) => {
        //     state.indexes = action.payload
        // }
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

            .addCase(resetPassword.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.user = action.payload.user
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error
            })
    }
})

export const {
    handleLogout,
    setAutoLogout,
    setError,
    setIndexes
} = authSlice.actions

export default authSlice.reducer