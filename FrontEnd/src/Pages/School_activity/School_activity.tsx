import Box_activity from '../../Components/Boxes/Box_activity/Box_activity';
import Box_highlights from '../../Components/Boxes/Box_highlights/Box_highlights';
import Typing_text from '../../Components/Component_for_text/Typing_text';
import { FaCirclePlus } from "react-icons/fa6";
import { useState } from 'react';
import Sub_page from '../../Components/Sub_page/Sub_page.tsx';
import { propsVerifica,propsCompiti,propsLezioni } from '../../Interfaces_and_types/Activity/interfaces_and_types_for_activity.ts';


export const School_activity = () => {
  const [subPage,setSubPage] = useState<string>('')
  return (
    (subPage === '' ? (
      <div id='school-activity'>
        <div id='title'>
          <Typing_text
            html_element='h3'
            text='School Activity'
            className=''
          />
        </div>
      <div id='highlights'>
        <Box_highlights 
        
        />
      </div>

      <div id='verifiche'>
        <Box_activity 
        
        />
        
        <div id='button-for-page'>
            <button onClick={() => setSubPage("verifiche")}>
              <FaCirclePlus />
            </button>
        </div>
      </div>

      <div id='compiti'>
        <Box_activity

        />

        <div id='button-for-page'>
            <button onClick={() => setSubPage("compiti")}>
              <FaCirclePlus />
            </button>
        </div>
      </div>

      <div id='lezioni'>
        <Box_activity
         
        />
        <div id='button-for-page'>
            <button onClick={() => setSubPage("lezioni")}>
              <FaCirclePlus />
            </button>
        </div>
      </div>
    </div>
      ): (
        <Sub_page
          argument={subPage}
          propsSchema={subPage === "lezioni" && propsLezioni || subPage === "compiti" && propsCompiti || subPage === "verifiche" && propsVerifica || undefined }
          functionForReturn={setSubPage}
        />
      )
    )
  )
}

export default School_activity;
