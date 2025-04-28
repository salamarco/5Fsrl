import {BrowserRouter,Routes,Route} from "react-router"
import { Homepage } from './Pages/Homepage/Homepage.tsx'
import Access_account from './Pages/Manage_account/Access_account/Access_account.tsx'

function App() {

  return (
   <div>
       <BrowserRouter>
          <Routes>
            <Route path="/AccessPage" element={<Access_account />} />
            <Route path="/" element={<Homepage />} />
          </Routes>
      </BrowserRouter>
   </div>
  )
}

export default App
