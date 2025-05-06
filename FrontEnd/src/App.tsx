import {BrowserRouter,Routes,Route} from "react-router"
import { Homepage } from './Pages/Homepage/Homepage.tsx'
import Access_account from './Pages/Manage_account/Access_account/Access_account.tsx'
import About from "./Pages/About/About.tsx"
import Help from "./Pages/Help/Help.tsx"
function App() {

  return (
   <div>
       <BrowserRouter>
          <Routes>
            <Route path="/AccessPage" element={<Access_account />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/About" element={<About />} />
            <Route path="/Help" element={<Help />} />
          </Routes>
      </BrowserRouter>

   </div>
  )
}

export default App
