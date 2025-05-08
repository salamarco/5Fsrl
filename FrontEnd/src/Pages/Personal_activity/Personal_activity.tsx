import Box_highlights from '../../Components/Boxes/Box_highlights/Box_highlights';
import Box_activity from '../../Components/Boxes/Box_activity/Box_activity';
import Typing_text from '../../Components/Component_for_text/Typing_text';
import Sub_page from '../../Components/Sub_page/Sub_page';
import { useState } from 'react';
import { FaCirclePlus } from "react-icons/fa6";
import { propsPersonal } from '../../Interfaces_and_types/Activity/interfaces_and_types_for_activity';

export const Personal_activity = () => {
  const [isSubPage, setIsSubPage] = useState<string>("")
  return (
    (isSubPage === "" ? (
      <div id='personal-activity'>
        <div id='title'>
          <Typing_text
            html_element='h3'
            text='Personal Activity'
            className=''
          />
        </div>
        <div id='highlights'>
          <Box_highlights 
        
          />
        </div>

        <div id='attività'>
          <Box_activity 
          
          />
          <div id='button-for-page'>
            <button onClick={() => setIsSubPage("personal")}>
              <FaCirclePlus />
            </button>
          </div>
        </div>
      </div>
    ): (
      <Sub_page 
        argument={isSubPage}
        propsSchema={propsPersonal}
        functionForReturn={setIsSubPage}
      />
    ))
    
  )
}

export default Personal_activity;
