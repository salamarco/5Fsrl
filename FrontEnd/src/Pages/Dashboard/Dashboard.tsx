import Sidebar from '../../Components/Sidebar/Sidebar.tsx';
import Typing_text from '../../Components/Component_for_text/Typing_text';
import { useAuth } from '../../Contexts/User_context/User_context.tsx';
import { useActivity } from '../../Contexts/Activity_context.tsx/Activity_context.tsx';
import { useEffect } from 'react';


export const Dashboard = () => {
  const {state} = useAuth()
  const{setState} = useActivity()

  useEffect(() => {
        const fetchDataActivity = async () => {
          const data = await fetch("https://randomuser.me/api", { //inserire URL per endpoint di tutte le attività
            method: "GET"
          });
          const jsonData = await data.json();
          setState(jsonData)
        };
        fetchDataActivity();
  
      }, [setState]);
  return (
    <div>
      <div className='sidebar'>
        <Sidebar />
      </div>
      <div id='dashboard'>
        <div id='upper-page'>
          <div id='welcome'>
            <h3>Benvenuto in nome.app </h3>
            <Typing_text text={(state.userData?.personal_data.username ? state.userData.personal_data.username : "ERROR DATA")} html_element='h3'/>
          </div>
        </div>
        <div id='main-part'>
          <div id='calendar'>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;