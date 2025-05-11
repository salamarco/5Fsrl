import Sidebar from '../../Components/Sidebar/Sidebar.tsx';
import Typing_text from '../../Components/Component_for_text/Typing_text';
import { useAuth } from '../../Contexts/User_context/User_context.tsx';


export const Dashboard = () => {
  const {state} = useAuth()
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
          <div id='sidebar'>
            <Sidebar />
          </div>
          <div id='calendar'>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;