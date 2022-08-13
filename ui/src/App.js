
import { Navigate, Route, Routes } from 'react-router-dom'
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


const App = () => {
    const dispatch = useDispatch()

    const isAuth = useSelector(state => state.auth.isAuth)
    const token = useSelector(state => state.auth.token)
    const user = useSelector(state => state.auth.user)

    useEffect(() => {
        dispatch(fetchAllResults({ token: token }))
    }, [dispatch, token])

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