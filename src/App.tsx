import './App.css'

import { Routes, Route } from "react-router-dom"
import Login from "./Login"
import RechargeDashboard from "./RechargeDashboard"

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/recharge-dashboard" element={<RechargeDashboard />} />
        </Routes>
    )
}

export default App
