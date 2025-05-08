import Filters from '../Component_for_data/Filters/Filters';
import Box_activity from '../Boxes/Box_activity/Box_activity';
import { useState,useEffect } from 'react';
import { propsCompiti,propsLezioni,propsPersonal,propsVerifica,filterData } from '../../Interfaces_and_types/Activity/interfaces_and_types_for_data';
import Typing_text from '../Component_for_text/Typing_text';
import { FaArrowLeft } from "react-icons/fa6";

interface subPage_props{
  argument: string,
  propsSchema: typeof propsCompiti | typeof propsVerifica | typeof propsLezioni | typeof propsPersonal | undefined
  functionForReturn: (value:string) => void 
  dataForFilters: Array<typeof filterData> | undefined
}

export const Sub_page: React.FC<subPage_props> = ({propsSchema,argument,functionForReturn,dataForFilters}) => {

  const [valueFilter,setValueFilter] = useState<{properties:string,value:string}>({properties:"",value:""})
  const [dataToVisualize,setDataToVisualize] = useState< Array<typeof propsSchema>>()
  //const [boxClick,setBoxClick] = useState() funzione per gestire la selezione di un box per modifica

  useEffect(() => {
    const fetchDataActivity = async () => {
      const data = await fetch("https://randomuser.me/api", {
        method: "GET"
      });
      const jsonData = await data.json();
      setDataToVisualize(jsonData.json)
    };

    fetchDataActivity();
  }, []);

  return (
    (propsSchema ? (
      <div id='subPage'>
        <div id='top-section'>
          <div id='title'>
            <Typing_text 
            text={argument}
            html_element='h4'
            className=''
            />
          </div>
          <div id='button-for-return'>
            <button onClick={() => functionForReturn("")}>
              <FaArrowLeft />
            </button>
          </div>
        </div>
        
        <div id='filters'>
          <Filters 
            listFilter={dataForFilters}
            functionForSetFilter={setValueFilter}
          />
        </div>

        <div id='boxes'>
          {(valueFilter.value === "" ? (
            <div id='all-activity'>
              {dataToVisualize?.map((element,elementIndex) => (
                <Box_activity 
                  key={elementIndex}
                  data={element}
                />
              ))}
            </div>
          ): (
            <div id='filtered-activity'>
              {dataToVisualize?.map((element,elementIndex) => {
                if(element !== undefined){
                  if (valueFilter.properties in element) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const propertyValue = (element as any)[valueFilter.properties];
                    if (String(propertyValue) === String(valueFilter.value)) {
                      return (
                        <Box_activity
                          key={elementIndex}
                          data={element}
                        />
                      );
                    }
                 }
                }
              })}
            </div>
          ))}
        </div>
      </div>
    ):(
      <div>
        Problemi nel reperimento dei dati delle attività
      </div>
    ))
    
  )
}

export default Sub_page;
