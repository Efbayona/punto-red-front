import './App.css'

import { Routes, Route } from "react-router-dom"
import Login from "./modules/login/components/Login.tsx"
import RechargeDashboard from "./modules/dashboard/components/RechargeDashboard.tsx"
import {ToastContainer} from "react-toastify";

function App() {
    return (
  <div>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/recharge-dashboard" element={<RechargeDashboard />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000}/>
  </div>
    )
}

export default App
