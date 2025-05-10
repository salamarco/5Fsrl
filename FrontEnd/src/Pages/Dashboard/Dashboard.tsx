import Sidebar from '../../Components/Sidebar/Sidebar.tsx';
import Typing_text from '../../Components/Component_for_text/Typing_text';


export const Dashboard = () => {
  return (
    <div id='dashboard'>
      <div id='upper-page'>
        <div id='welcome'>
          <h3>Benvenuto in nome.app </h3>
          <Typing_text text={""} html_element='h3'/> // inserire username dell'utente preso dal context
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
  )
}

export default Dashboard;