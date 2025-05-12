import Box_activity from '../../../Components/Boxes/Box_activity/Box_activity.tsx';
import Box_highlights from '../../../Components/Boxes/Box_highlights/Box_highlights.tsx';
import Typing_text from '../../../Components/Component_for_text/Typing_text.tsx';
import { FaCirclePlus } from "react-icons/fa6";
import { useState,useEffect } from 'react';
import Sub_page from '../../../Components/Sub_page/Sub_page.tsx';
import { propsVerifica,propsCompiti,propsLezioni } from '../../../Interfaces_and_types/Activity/interfaces_and_types_for_data.ts';
import data_for_filter from '../data_for_filters.json'
import Sidebar from '../../../Components/Sidebar/Sidebar.tsx';


export const School_activity = () => {
  const [subPage,setSubPage] = useState<string>("")
  const[dataToVisualize,setDataToVisualize] = useState<{compiti: Array<typeof propsCompiti>,verifiche: Array<typeof propsVerifica>, lezioni: Array<typeof propsLezioni>}>()

  useEffect(() => {
        const fetchDataActivity = async () => {
          const data = await fetch("https://randomuser.me/api", { // inserire url per attivita' scolastiche
            method: "GET"
          });
          const jsonData = await data.json();
          setDataToVisualize(jsonData.json)
        };
    
        fetchDataActivity();
      }, []);

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
          {dataToVisualize?.verifiche.map((element,elementIndex) => {
              if(elementIndex < 5){
                return <Box_activity data={element}/>
              }
          })}
          <div id='button-for-page'>
              <button onClick={() => setSubPage("Verifiche")}>
                <FaCirclePlus />
              </button>
          </div>
        </div>

        <div id='compiti'>
          {dataToVisualize?.compiti.map((element,elementIndex) => {
              if(elementIndex < 5){
                return <Box_activity data={element}/>
              }
          })}

          <div id='button-for-page'>
              <button onClick={() => setSubPage("Compiti")}>
                <FaCirclePlus />
              </button>
          </div>
        </div>

        <div id='lezioni'>
          {dataToVisualize?.lezioni.map((element,elementIndex) => {
              if(elementIndex < 5){
                return <Box_activity data={element}/>
              }
          })}
          <div id='button-for-page'>
              <button onClick={() => setSubPage("Lezioni")}>
                <FaCirclePlus />
              </button>
          </div>
        </div>
      </div>
      ): (
        <Sub_page
          argument={subPage}
          propsSchema={subPage === "Lezioni" && propsLezioni || subPage === "Compiti" && propsCompiti || subPage === "Verifiche" && propsVerifica || undefined }
          functionForReturn={setSubPage}
          dataForFilters={JSON.parse(JSON.stringify((subPage === "Lezioni" && data_for_filter.lezioni || subPage === "Compiti" && data_for_filter.compiti || subPage === "Verifiche" && data_for_filter.verifiche || undefined )))}
        />
      )
    )}
  </div>
  )
}

export default School_activity;
