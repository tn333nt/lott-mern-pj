
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
import { handleLogout, setIsAuth, setAuthLoading, setToken, setUser } from './flux/slices/authSlice.js';


const App = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isAuth,
        token, user
    } = useSelector(state => state.auth)


    useEffect(() => {
        dispatch(fetchAllResults({ token: token }))
    }, [dispatch, token])


    // later : refresh -> stay on current page
    useEffect(() => {
        const token = localStorage.getItem('token')
        const user = JSON.parse(localStorage.getItem('user'))
        const expiryDate = localStorage.getItem('expiryDate')

        if (!token || !expiryDate) {
            return
        }

        // auto logout if over 1h from login
        if (new Date(expiryDate) <= new Date()) {
            dispatch(handleLogout())
            return
        }

        dispatch(setToken(token))
        dispatch(setUser(user))
        dispatch(setIsAuth(true))
        dispatch(setAuthLoading(false))

    }, [dispatch, isAuth])


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