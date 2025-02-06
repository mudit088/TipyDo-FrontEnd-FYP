import './App.css'
import Dashboard from './Components/Dashboard'
import Home from './Components/Home'
import SignUp from './Components/SignUp'
import Navbar from './Components/Navbar'
import Login from './Components/Login'
import Client from './Components/Client'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Success from './Components/Success'
import Failure from './Components/Failure'
import EmployeeLogin from './Components/EmployeeLogin'
import EmplyeeDashboard from './Components/EmplyeeDashboard'
import Error from './Components/Error'
import Howtip from './Components/Howtip'
import EmployeeCard from './Components/EmployeeCard'
import SessionCard from './Components/SessionCard'

function App() {

  return (
  <div>
    <Router>
   
   
    {/* <Howtip/> */}
    {/* <Success/> */}
    {/* <Failure/> */}
        <Routes>

          
          <Route exact path="/" element={<><Navbar/><Home/></>} />

          <Route exact path="/signup" element={<><Navbar/><SignUp/></>} />
         

          <Route exact path="/dashboard/manager" element={<Dashboard/>} />

          <Route exact path="/login/manager" element={<><Navbar/><Login/></>} />

          <Route exact path="/login/employee" element={<><Navbar/><EmployeeLogin/></>} />

          <Route exact path="/dashboard/employee" element={<EmplyeeDashboard/>} />

          <Route exact path="/client/:username" element={<Client/>} />

          <Route exact path="/*" element={<><Navbar/><Error/></>} />

        </Routes>
      </Router>
      
  </div>
  )
}

export default App
