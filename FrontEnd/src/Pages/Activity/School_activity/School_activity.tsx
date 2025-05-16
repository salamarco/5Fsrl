import Box_activity from '../../../Components/Boxes/Box_activity/Box_activity.tsx';
import Box_highlights from '../../../Components/Boxes/Box_highlights/Box_highlights.tsx';
import Typing_text from '../../../Components/Component_for_text/Typing_text.tsx';
import { FaArrowDown } from "react-icons/fa6";
import { useState} from 'react';
import Sub_page from '../../../Components/Sub_page/Sub_page.tsx';
import Sidebar from '../../../Components/Sidebar/Sidebar.tsx';
import { useActivity } from '../../../Contexts/Activity_context.tsx/Activity_context.tsx';


export const School_activity = () => {
  const [subPage,setSubPage] = useState<'Lezioni' | 'Verifiche' | 'Compiti' | 'Personal' | ''>('')
  const{state} = useActivity()

  return (
    <div id='complete-page'>
      <div className='sidebar'>
        <Sidebar />
      </div>
      {(subPage === "" ? (
        <div id='school-activity'>
          <div id='title'>
            <Typing_text
              html_element='h3'
              text='School Activity'
            />
          </div>
        <div id='highlights'>
          <Box_highlights 
          
          />
        </div>

        <div id='verifiche'>
          {state.list_verifiche.map((element,elementIndex) => {
              if(elementIndex < 5){
                return (
                <Box_activity
                  argumentActivity='Verifiche'
                  data={element}
                />
                )
              }
          })}
          <div id='button-for-page'>
              <button onClick={() => setSubPage("Verifiche")}>
                <FaArrowDown />
              </button>
          </div>
        </div>

        <div id='compiti'>
          {state.list_compiti.map((element,elementIndex) => {
              if(elementIndex < 5){
                return (
                <Box_activity 
                  argumentActivity='Compiti'
                  data={element}/>
                )
              }
          })}

          <div id='button-for-page'>
              <button onClick={() => setSubPage("Compiti")}>
                <FaArrowDown />
              </button>
          </div>
        </div>

        <div id='lezioni'>
          {state.list_lezioni.map((element,elementIndex) => {
              if(elementIndex < 5){
                return (
                <Box_activity 
                  data={element}
                  argumentActivity='Lezioni'
                />
                )
              }
          })}
          <div id='button-for-page'>
              <button onClick={() => setSubPage("Lezioni")}>
                <FaArrowDown/>
              </button>
          </div>
        </div>
      </div>
      ): (
        <Sub_page
          argument={subPage}
          data={(subPage === 'Compiti' && state.list_compiti || subPage === 'Lezioni' && state.list_lezioni || subPage === 'Verifiche' && state.list_verifiche || undefined)}
          functionForReturn={setSubPage}
        />
      )
    )}
  </div>
  )
}

export default School_activity;
