import {BrowserRouter,Routes,Route} from "react-router"
import Homepage from './Pages/Homepage/Homepage.tsx'
import Access_account from './Pages/Manage_account/Access_account/Access_account.tsx'
import Dashboard from './Pages/Dashboard/Dashboard.tsx'
import School_activity from './Pages/Activity/School_activity/School_activity.tsx'
import Personal_activity from './Pages/Activity/Personal_activity/Personal_activity.tsx'
import About from "./Pages/About/About.tsx"
import Help from "./Pages/Help/Help.tsx"
import { useEffect, useState } from "react";

function App() {


  // Tutto questo serve per tener traccia del tempo passato dall'apertura dell'applicazione,
  // in modo da far fare l'animazione dell'header solo all'inizio, e non ogni volta che si cambia pagina
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  var done = false;

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (secondsElapsed > 3) {
    done = true;
  }

  return (
   <div>
       <BrowserRouter>
          <Routes>
            <Route path="/AccessPage" element={<Access_account />} />
            <Route path="/" element={<Homepage isDone={done}/>} />
            <Route path="/Dashboard" element= {<Dashboard/>} />
            <Route path="/PersonalActivity" element= {<Personal_activity/>} />
            <Route path="/SchoolActivity" element= {<School_activity/>} />
            <Route path="/About" element={<About />} />
            <Route path="/Help" element={<Help />} />
          </Routes>
      </BrowserRouter>

   </div>
  )
}

export default App
