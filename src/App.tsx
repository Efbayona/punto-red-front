import './App.css'

import { Routes, Route } from "react-router-dom"
import Login from "./modules/login/components/Login.tsx"
import RechargeDashboard from "./modules/dashboard/components/RechargeDashboard.tsx"

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/recharge-dashboard" element={<RechargeDashboard />} />
        </Routes>
    )
}

export default App
