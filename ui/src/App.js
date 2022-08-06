
import { Navigate, Route, Routes } from 'react-router-dom'

import { Header } from './components/Header.js'
import Results from './pages/admin/Results.js'
import Users from './pages/admin/Users.js'
import Login from './pages/auth/Login.js'
import ResetPassword from './pages/auth/ResetPassword.js'
import SignUp from './pages/auth/SignUp.js'
import Home from './pages/user/Home.js'

const App = () => (
    <div>
        <Header />
        <Routes>
            <Route path="/Results" element={<Results />} />
            <Route path="/Users" element={<Users />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />
            <Route path="/" element={<Navigate to="/Home" />} />
        </Routes>
    </div>
)

export default App