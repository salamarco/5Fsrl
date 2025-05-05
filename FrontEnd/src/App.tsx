import {BrowserRouter,Routes,Route} from "react-router"
import { Homepage } from './Pages/Homepage/Homepage.tsx'
import Access_account from './Pages/Manage_account/Access_account/Access_account.tsx'
import Dashboard from './Pages/Dashboard/Dashboard.tsx'
import School_activity from './Pages/School_activity/School_activity.tsx'
import Personal_activity from './Pages/Personal_activity/Personal_activity.tsx'

function App() {

  return (
   <div>
       <BrowserRouter>
          <Routes>
            <Route path="/AccessPage" element={<Access_account />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/Dashboard" element= {<Dashboard/>} />
            <Route path="/PersonalActivity" element= {<Personal_activity/>} />
            <Route path="/SchoolActivity" element= {<School_activity/>} />
          </Routes>
      </BrowserRouter>
   </div>
  )
}

export default App
