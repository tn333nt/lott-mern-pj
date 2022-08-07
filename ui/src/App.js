
import { Navigate, Route, Routes } from 'react-router-dom'

import { Header } from './components/Header.js'
import Results from './pages/Results.js'
import Users from './pages/admin/Users.js'
import Login from './pages/auth/Login.js'
import ResetPassword from './pages/auth/ResetPassword.js'
import SignUp from './pages/auth/SignUp.js'
import Home from './pages/user/Home.js'

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllResults } from './flux/slices/resultsSlice';
import { fetchAllUsers } from './flux/slices/usersSlice.js'
import Account from './pages/Account.js'

const App = () => {
    const dispatch = useDispatch()

    const isAuth = useSelector(state => state.auth.isAuth)
    const token = useSelector(state => state.auth.token)
    const user = useSelector(state => state.auth.user)
    const results = useSelector(state => state.results.results)

    useEffect(() => {
        dispatch(fetchAllResults({ token: token }))
    }, [dispatch, token])
    console.log(results)

    return (
        <div>
            <Header />
            {!isAuth && (
                <Routes>
                    <Route>
                        <Route path="/" element={<Home />} />
                        <Route path="/Results" element={<Results />} />
                    </Route>
                    <Route path="/SignUp" element={<SignUp />} />
                    <Route>
                        <Route path="/Login" element={<Login />} />
                        <Route path="/ResetPassword" element={<ResetPassword />} />
                    </Route>
                    <Route
                        path="*"
                        element={<Navigate to="/Login" replace />}
                    />
                </Routes>
            )}
            {user && user.isAdmin && (
                <Routes>
                    <Route path="/Results" element={<Results />} />
                    <Route path="/Users" element={<Users />} />
                    <Route path="/Account" element={<Account />} />
                    <Route
                        path="*"
                        element={<Navigate to="/Results" replace />}
                    />
                </Routes>
            )}
            {user && !user.isAdmin && (
                <Routes>
                    <Route>
                        <Route path="/" element={<Home />} />
                        <Route path="/Results" element={<Results />} />
                    </Route>
                    <Route path="/Account" element={<Account />} />
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