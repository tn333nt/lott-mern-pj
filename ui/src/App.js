
import { Navigate, Route, Routes } from 'react-router-dom'

import { Header } from './components/Header.js'
import Results from './pages/admin/Results.js'
import Users from './pages/admin/Users.js'
import Login from './pages/auth/Login.js'
import ResetPassword from './pages/auth/ResetPassword.js'
import SignUp from './pages/auth/SignUp.js'
import Home from './pages/user/Home.js'

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllResults } from './flux/slices/resultsSlice';
import Account from './pages/Account.js'

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllResults())
    }, [dispatch])

    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Results" element={<Results />} />
                <Route path="/Users" element={<Users />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/Account" element={<Account />} />
                <Route path="/ResetPassword" element={<ResetPassword />} />
                <Route
                    path="*" // match only when no other routes do
                    element={<Navigate to="/" replace />}
                />
            </Routes>
        </div>
    )
}


export default App