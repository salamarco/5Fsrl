import Box_highlights from '../../../Components/Boxes/Box_highlights/Box_highlights';
import Box_activity from '../../../Components/Boxes/Box_activity/Box_activity';
import Typing_text from '../../../Components/Component_for_text/Typing_text';
import Sub_page from '../../../Components/Sub_page/Sub_page';
import { useState,useEffect } from 'react';
import { FaCirclePlus } from "react-icons/fa6";
import { propsPersonal } from '../../../Interfaces_and_types/Activity/interfaces_and_types_for_data';
import data_for_filters from '../data_for_filters.json'
import Sidebar from '../../../Components/Sidebar/Sidebar';

export const Personal_activity = () => {
  const [isSubPage, setIsSubPage] = useState<string>("")
  const [dataToVisualize,setDataToVisualize] = useState<Array<typeof propsPersonal> | undefined>()

  useEffect(() => {
      const fetchDataActivity = async () => {
        const data = await fetch("https://randomuser.me/api", { // inserire url per attivita' personali
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
              {dataToVisualize?.map((element,elementIndex) => {
                if(elementIndex < 5){
                  return <Box_activity data={element}/>
                }
              })}
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
          dataForFilters={JSON.parse(JSON.stringify(data_for_filters.personal))}
        />
      ))}
    </div>
    
  )
}

export default Personal_activity;
