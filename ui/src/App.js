
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Header } from './components/Header.js'
import { fetchAllResults } from './flux/slices/resultsSlice';

import Results from './pages/Results.js'
import Users from './pages/admin/Users.js'
import Login from './pages/auth/Login.js'
import ResetPassword from './pages/auth/ResetPassword.js'
import SignUp from './pages/auth/SignUp.js'
import Home from './pages/user/Home.js'
import Account from './pages/Account.js'
import { handleLogout, setAutoLogout, setIsAuth, setAuthLoading, setToken, setUser } from './flux/slices/authSlice.js';


const App = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isAuth,
        token, user 
    } = useSelector(state => state.auth)

    // const tokenLS = localStorage.getItem('token') ? localStorage.getItem('token') : ''
    // const userLS = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

    useEffect(() => {
        dispatch(fetchAllResults({ token: token }))
    }, [dispatch, token])


    useEffect(() => {
        // nma htai cu refresh cai la no auto qua '/'
        const token = localStorage.getItem('token')
        const user = JSON.parse(localStorage.getItem('user'))
        const expiryDate = localStorage.getItem('expiryDate')

        if (!token || !expiryDate) {
            console.log(456)
            return 
        }

        // https://stackoverflow.com/a/71170128
        // bc isAuth from store is determined before reading data from LS
        // co pending r ma
        // not work
        if (!isAuth) {
            console.log(789)
            dispatch(setAuthLoading(true))
        }

        // auto logout if over 1h from login
        if (new Date(expiryDate) <= new Date()) {
            console.log(123)
            // why does not clear LS ?
            // thieu dispatch 
            // chac vi no vao case nay nen ko set gi phia duoi
            // => still thoat ra but not actually clear anything
            dispatch(handleLogout())
            return 
        }
        // no van tinh so am nen set pure autologoutko co td?
        // => 

        const remainingMilliseconds =
            +new Date(expiryDate).getTime() - +new Date().getTime()

        console.log(expiryDate, 'expiryDate')
        console.log(remainingMilliseconds, 'remainingMilliseconds')

        dispatch(setToken(token))
        dispatch(setUser(user))
        // if (remainingMilliseconds > 0) {
            // dispatch(setAutoLogout(remainingMilliseconds))
            dispatch(setIsAuth(true))
        // } else {
        //     dispatch(setAutoLogout(0))
        //     dispatch(setIsAuth(false))
        // }

        // window.location.reload(false);

        // location.reload()
        // navigate(0)

        dispatch(setAuthLoading(false))


    }, [dispatch, isAuth])

    
    console.log(token, 'token')
    console.log(user, 'user')

    return (
        <div>
            <Header />
            {!isAuth && !user && (
                <Routes>
                    <Route>
                        <Route path="/" element={<Home />} />
                        <Route path="/results" element={<Results />} />
                    </Route>
                    <Route path="/signup" element={<SignUp />} />
                    <Route>
                        <Route path="/login" element={<Login />} />
                        <Route path="/resetPassword" element={<ResetPassword />} />
                    </Route>
                    <Route
                        path="*"
                        element={<Navigate to="/login" repalce />}
                    />
                </Routes>
            )}
            {isAuth && user && user.isAdmin && (
                <Routes>
                    <Route path="/results" element={<Results />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/account" element={<Account />} />
                    <Route
                        path="*"
                        element={<Navigate to="/results" replace />}
                    />
                </Routes>
            )}
            {isAuth && user && !user.isAdmin && (
                <Routes>
                    <Route>
                        <Route path="/" element={<Home />} />
                        <Route path="/results" element={<Results />} />
                    </Route>
                    <Route path="/account" element={<Account />} />
                    <Route
                        path="*"
                        element={<Navigate to="/" replace />}
                    />
                </Routes>
            )}
        </div>
    )
}


export default App