import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// not functional comp
import { useDispatch } from 'react-redux'
import usersSlice, { test } from './usersSlice'
// loi vong lap
// import store from '../store'

console.log(usersSlice)
console.log(usersSlice.actions)


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

// tam de ben nay de tien cap nhat user
export const postTicket = createAsyncThunk('postTicket', async (props) => {
    const url = 'http://localhost:8080/tickets/ticket'
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json', Authorization: props.token },
        body: JSON.stringify(props.ticket)
    })

    const data = await res.json()

    if (res.status !== 200 && res.status !== 201) {
        throw new Error(data.message)
    }
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
    },
    reducers: {
//         setAutoLogout: (state, action) => {
//             // set expiredate
//             console.log(+action.payload, 2164821)
// // sao 0 roi ma no ko chay ham ?
//             setTimeout(() => {
//                 // handleLogout()

//                 console.log(681648236428)
//                 // https://stackoverflow.com/a/53448635
//                 state.isAuth = false
//                 state.token = null
//                 state.user = null

//                 // localStorage.clear()
//                 localStorage.removeItem('user')
//                 // authSlice.actions.handleLogout()

//             }, +action.payload);

//         },
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
            console.log(action.payload, 94808429084092)
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
                // state.user = action.payload.user
                // maybe cuz of using user to check isAuth T sometimes => crash with isAuth F
                // => fix : check token , not user
                // or : diff state to save input

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

                console.log(action.payload, 'action.payload')

                // save to local memory (state)
                state.token = action.payload.token
                state.user = action.payload.user

                const remainingMilliseconds = 60 * 60 * 1000
                const expiryDate = new Date(
                    new Date().getTime() + remainingMilliseconds
                );
                // expiryDate.setHours(expiryDate.getHours() + 7)

                console.log(expiryDate.toISOString(), 52759)

                // save to browser's memory (LS)
                localStorage.setItem('token', action.payload.token)
                localStorage.setItem('user', JSON.stringify(action.payload.user))
                localStorage.setItem('expiryDate', expiryDate.toISOString())
                // setAutoLogout(remainingMilliseconds)
                // test()
                // authSlice.actions.setAutoLogout(remainingMilliseconds)

                // const dispatch = useDispatch()
                // dispatch(test())

                console.log(authSlice)
                // console.log(store.getState())

            })
            .addCase(handleLogin.rejected, (state, action) => {
                console.log(action.error.message)
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

            .addCase(postTicket.pending, (state, action) => {
                state.isAuthLoading = true
            })
            .addCase(postTicket.fulfilled, (state, action) => {
                state.isAuthLoading = false
                // update ui immediately
                state.user = action.payload.user
                // update after refresh page
                localStorage.setItem('user', JSON.stringify(action.payload.user))

            })
            .addCase(postTicket.rejected, (state, action) => {
                state.isAuthLoading = false
                state.message = action.error.message
            })

            .addCase(deleteAllTickets.pending, (state, action) => {
                state.isAuthLoading = true
            })
            .addCase(deleteAllTickets.fulfilled, (state, action) => {
                state.isAuthLoading = false
                state.message = "deleted all"
                state.user = action.payload.user
                localStorage.setItem('user', JSON.stringify(action.payload.user))

            })
            .addCase(deleteAllTickets.rejected, (state, action) => {
                state.isAuthLoading = false
                state.message = action.error.message
            })

    }
})

export const {
    handleLogout,
    setAutoLogout,
    setAuthError,
    setLoginInput,
    setUser,
    setToken,
    setIsAuth,
    setAuthLoading
} = authSlice.actions

export default authSlice.reducer