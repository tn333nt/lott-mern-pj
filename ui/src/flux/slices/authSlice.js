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

    const data = await res.json()

    if (res.status !== 200 && res.status !== 201) {
        throw new Error(data.message)
    }

    return data
})

export const handleSingup = createAsyncThunk('handleSingup', async (authData) => {
    const url = "http://localhost:8080/auth/signup"

    const res = await fetch(url, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(authData)
    })

    const data = await res.json()

    if (res.status !== 200 && res.status !== 201) {
        throw new Error(data.message)
    }

    return data
})


export const handleLogin = createAsyncThunk('handleLogin', async (authData) => {
    const url = "http://localhost:8080/auth/login"

    const res = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(authData)
    })

    const data = await res.json()

    if (res.status !== 200) {
        throw new Error(data.message)
    }

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

    const data = await res.json()
    if (res.status !== 200 && res.status !== 201) {
        throw new Error(data.message)
    }
    return data
})


const loginInput = {
    email: '',
    password: '',
}


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        token: null,
        user: null,
        isAuthLoading: false,
        error: '',
        loginInput,
        isOpenModal: false // modal chung cho all confirm & msg
    },
    reducers: {
        toggleModal: (state, action) => {
            state.isOpenModal = !state.isOpenModal
        },

        handleLogout: (state, action) => {
            state.isAuth = false
            state.token = null
            state.user = null
            state.error = ''

            localStorage.clear()
        },
        setAuthError: (state, action) => {
            state.error = action.payload ? action.payload : ''
        },
        setLoginInput: (state, action) => {
            state.loginInput = action.payload ? action.payload : loginInput
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
        setIsAuth: (state, action) => {
            state.isAuth = action.payload
        },
        setAuthLoading: (state, action) => {
            state.isAuthLoading = action.payload
        },
    },

    extraReducers: builder => {
        builder
            .addCase(handleSingup.pending, (state, action) => {
                state.isAuthLoading = true
                state.error = ''
            })
            .addCase(handleSingup.fulfilled, (state, action) => {
                state.isAuth = false
                state.isAuthLoading = false
                state.error = ''
                state.loginInput = action.payload

            })
            .addCase(handleSingup.rejected, (state, action) => {
                state.isAuth = false
                state.isAuthLoading = false
                state.error = action.error.message
            })

            .addCase(handleLogin.pending, (state, action) => {
                state.isAuthLoading = true
                state.error = ''
            })
            .addCase(handleLogin.fulfilled, (state, action) => {
                state.isAuth = true
                state.isAuthLoading = false
                state.error = ''

                // save to local memory (state)
                state.token = action.payload.token
                state.user = action.payload.user

                const remainingMilliseconds = 60 * 60 * 1000
                const expiryDate = new Date(
                    new Date().getTime() + remainingMilliseconds
                );

                // save to browser's memory (LS)
                localStorage.setItem('token', action.payload.token)
                localStorage.setItem('user', JSON.stringify(action.payload.user))
                localStorage.setItem('expiryDate', expiryDate.toISOString())

            })
            .addCase(handleLogin.rejected, (state, action) => {
                state.isAuth = false
                state.isAuthLoading = false
                state.error = action.error.message
            })

            .addCase(resetPassword.pending, (state, action) => {
                state.isAuthLoading = true
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.error = ''
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isAuthLoading = false
                state.error = action.error.message
            })

            .addCase(changePassword.pending, (state, action) => {
                state.isAuthLoading = true
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.user = action.payload.user
                localStorage.setItem('user', JSON.stringify(action.payload.user))
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.isAuthLoading = false
                state.error = action.error.message
            })


    }
})

export const {
    toggleModal,
    handleLogout,
    setAuthError,
    setLoginInput,
    setUser,
    setToken,
    setIsAuth,
    setAuthLoading
} = authSlice.actions

export default authSlice.reducer