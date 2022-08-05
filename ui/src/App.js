
import { Navigate, Route, Routes } from 'react-router-dom'

import { Header } from './components/Header.js'
import Results from './pages/Results.js'
import Users from './pages/Users.js'

const App = () => (
    <div>
        <Header />
        <Routes>
            <Route path="/Results" element={<Results />} />
            <Route path="/Users" element={<Users />} />
            <Route path="/" element={<Navigate to="/Results" />} />
        </Routes>
    </div>
)

export default App