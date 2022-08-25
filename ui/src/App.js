
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Header } from './components/Header.js'
import { fetchAllResults } from './flux/slices/resultsSlice';

import Results from './pages/user/Results.js'
import Users from './pages/admin/Users.js'
import Login from './pages/auth/Login.js'
import ResetPassword from './pages/auth/ResetPassword.js'
import SignUp from './pages/auth/SignUp.js'
import Home from './pages/user/Home.js'
import Account from './pages/Account.js'
import { handleLogout, setIsAuth, setAuthLoading, setToken, setUser } from './flux/slices/authSlice.js';
import ResultsManagement from './pages/admin/ResultsManagement.js';
import { setMessage, toggleModal } from './flux/slices/sharedSlice.js';


const App = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isAuth, isSwitched,
        token, user
    } = useSelector(state => state.auth)

    const { searchText, currentPage } = useSelector(state => state.shared)

    // vi dung chung data => gui data 1 the o day
    useEffect(() => {
        dispatch(fetchAllResults({ searchText, currentPage, token }))
    }, [dispatch, token, searchText, currentPage])

    useEffect(() => {
        async function fetchData() {
            const data = await dispatch(fetchAllResults({ searchText, currentPage, token }))
            if (data.error) {
                dispatch(toggleModal())
                dispatch(setMessage(data.error.message))
                return
            }
        }
        fetchData()
    }, [currentPage, searchText, token, dispatch])


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
            {/* not user */}
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
            {/* admin */}
            {isAuth && user && user.isAdmin && !isSwitched && (
                <Routes>
                    <Route path="/" element={<ResultsManagement />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/account" element={<Account />} />
                    <Route
                        path="*"
                        element={<Navigate to="/" replace />}
                    />
                </Routes>
            )}
            {/* user */}
            {((isAuth && user && !user.isAdmin) || (user && user.isAdmin && isSwitched)) && (
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