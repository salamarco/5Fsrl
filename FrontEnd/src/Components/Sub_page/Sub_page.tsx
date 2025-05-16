import Filters from '../Component_for_data/Filters/Filters';
import Box_activity from '../Boxes/Box_activity/Box_activity';
import { useState} from 'react';
import { propsCompiti,propsLezioni,propsPersonal,propsVerifica} from '../../Interfaces_and_types/Activity/interfaces_for_activity';
import { filterData,dataFromFilterJSON } from '../../Interfaces_and_types/Activity/interfaces_for_definition';
import Typing_text from '../Component_for_text/Typing_text';
import { FaArrowLeft } from "react-icons/fa6";
import data_for_filters from '../../Pages/Activity/Filter_activity_defintion.json'
import { useSubPage } from '../../Contexts/SubPage_context/SubPage_context';
import Modal from '../Modal/Modal';
import { IoAddCircleOutline } from "react-icons/io5";

interface subPage_props{
  argument: 'Lezioni' | 'Verifiche' | 'Compiti' | 'Personal' | '',
  data: Array <typeof propsCompiti> | Array<typeof propsVerifica> | Array<typeof propsLezioni> | Array<typeof propsPersonal> | undefined
  functionForReturn: (value: 'Verifiche' | 'Compiti' | 'Lezioni' | 'Personal' | '') => void 
}

export const Sub_page: React.FC<subPage_props> = ({data,argument,functionForReturn}) => {

  const [valueFilter,setValueFilter] = useState<{properties:string,value:string}>({properties:"",value:""})
  const dataTotalFilter: dataFromFilterJSON = JSON.parse(JSON.stringify(data_for_filters))
  const{state,setState} = useSubPage()
  
  const dataForFilters: Array<typeof filterData> = JSON.parse(JSON.stringify(
    (argument === 'Compiti' && dataTotalFilter.Compiti || 
      argument === 'Lezioni' && dataTotalFilter.Lezioni || 
      argument === 'Verifiche' && dataTotalFilter.Verifiche || 
      argument === 'Personal' && dataTotalFilter.Personal)
    ))

  return (
    <div id='subPage'>
      <div id='top-section'>
        <div id='title'>
          <Typing_text 
          text={argument}
          html_element='h4'
          />
        </div>
        <div id='button-for-return'>
          <button onClick={() => functionForReturn("")}>
            <FaArrowLeft />
          </button>
        </div>
      </div>
      <div>
         <div id='filters'>
            <Filters 
              listFilter={dataForFilters}
              functionForSetFilter={setValueFilter}
            />
          </div>
          <div id='button-add-activity'>
            <button onClick={() => setState({modeToOpenBox:'add',argumentActivity:(argument !== '' ? argument : undefined)})}>
              <IoAddCircleOutline />
            </button>
          </div>
      </div>
      {(data ? (
        <div id='main-part'>
          <div id='boxes'>
            {(valueFilter.value === "" ? (
              <div id='all-activity'>
                {data.map((element,elementIndex) => (
                  <Box_activity 
                    argumentActivity={(argument !== '' ? argument : undefined)}
                    key={elementIndex}
                    data={element}
                  />
                ))}
              </div>
            ): (
              <div id='filtered-activity'>
                {data.map((element,elementIndex) => {
                  if(element !== undefined){
                    if (valueFilter.properties in element) {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      const propertyValue = (element as any)[valueFilter.properties];
                      if (String(propertyValue) === String(valueFilter.value)) {
                        return (
                          <Box_activity
                            argumentActivity={(argument !== '' ? argument : undefined)}
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
          <div>
            {(state.modeToOpenBox) && (
              <div id='modal-of-box'>
                <Modal />
              </div>
            )}
          </div>
        </div>
      ): (
        <div>
          ERRORE NEL REPERIMENTO DEI DATI DEI BOX
        </div>
      ))}
    </div>
    
  )
}

export default Sub_page;
