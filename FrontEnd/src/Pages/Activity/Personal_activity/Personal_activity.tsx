import Box_highlights from '../../../Components/Boxes/Box_highlights/Box_highlights';
import Box_activity from '../../../Components/Boxes/Box_activity/Box_activity';
import Typing_text from '../../../Components/Component_for_text/Typing_text';
import Sub_page from '../../../Components/Sub_page/Sub_page';
import { useState} from 'react';
import { FaCirclePlus } from "react-icons/fa6";
import Sidebar from '../../../Components/Sidebar/Sidebar';
import { useActivity } from '../../../Contexts/Activity_context.tsx/Activity_context';
import {SubPageProvider} from '../../../Contexts/SubPage_context/SubPage_context.tsx'


export const Personal_activity = () => {
  const [isSubPage, setIsSubPage] = useState<'Personal' | 'Compiti' | 'Verifiche' | 'Lezioni' | ''>('')
  const{state} = useActivity()

  return (
    <div id='complete-page'>
      <div className='sidebar'>
        <Sidebar />
      </div>
      {(isSubPage === "" ? (
        <div id='personal-activity'>
          <div id='title'>
            <Typing_text
              html_element='h3'
              text='Personal Activity'
            />
          </div>
          <div id='highlights'>
            <Box_highlights
          
            />
          </div>

          <div id='attività'>
              {state.list_personali.map((element,elementIndex) => {
                if(elementIndex < 5){
                  return <Box_activity data={element}/>
                }
              })}
            <div id='button-for-page'>
              <button onClick={() => setIsSubPage("Personal")}>
                <FaCirclePlus />
              </button>
            </div>
          </div>
        </div>
      ): (
        <SubPageProvider>
          <Sub_page 
            argument={isSubPage}
            data={(isSubPage === 'Personal' && state.list_personali || undefined)}
            functionForReturn={setIsSubPage}
          />
        </SubPageProvider>
      ))}
    </div>
    
  )
}

export default Personal_activity;
