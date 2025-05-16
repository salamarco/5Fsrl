import { propsCompiti,propsLezioni,propsVerifica,propsPersonal } from '../../../Interfaces_and_types/Activity/interfaces_for_activity';
import { activityFieldDefinitions } from '../../../Interfaces_and_types/Activity/interfaces_for_definition';
import { HiDotsHorizontal } from "react-icons/hi";
import React from 'react';
import {useState } from 'react';
import { useSubPage } from '../../../Contexts/SubPage_context/SubPage_context';
import Field from '../../Component_for_data/Field/Field';
import Field_activity_definition from '../../../Pages/Activity/Field_activity_definition.json' 

interface propsBoxActivity{
  data: typeof propsCompiti | typeof propsVerifica | typeof propsLezioni | typeof propsPersonal | undefined,
  argumentActivity?: 'Personal' | 'Verifiche' | 'Lezioni' | 'Compiti'
}

export const Box_activity: React.FC<propsBoxActivity> = ({data,argumentActivity}) => {
  const [visualizeOption,setVisualizeOption] = useState<boolean>(false)
  const{setState} = useSubPage()
  
  const fieldDefinitionParse = Field_activity_definition as activityFieldDefinitions
  const fieldDefinitions = argumentActivity ? fieldDefinitionParse[argumentActivity] : undefined;
  const schemaForParse = argumentActivity ? (argumentActivity === 'Compiti' && propsCompiti || argumentActivity === 'Lezioni' && propsLezioni || argumentActivity === 'Verifiche' && propsVerifica || argumentActivity === 'Personal' && propsPersonal ) : undefined
  const dataParse = schemaForParse ? schemaForParse.safeParse(data) : undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dataFinal: { [key: string]: any } | undefined = dataParse?.data ? dataParse.data : undefined
  
  return (
    (dataFinal && fieldDefinitions ? (
      <div id='box/activity'>
        <div button-box>
          {(visualizeOption) ? (
            <button onClick={() => setVisualizeOption(true)}> 
              <HiDotsHorizontal/>
            </button>
          ):(
            //inserire anche come dati da passare l'id dell'attivita', l'id va messo come props dei vari PropsPersonal, propsVerifica ...
              // si prende l'id dell'activity e si mette nel contesto del subPage
            <div id='options'>
              <div id='edit-button'  onClick={() => {setState({modeToOpenBox:'edit', data:data,argumentActivity:argumentActivity});setVisualizeOption(false)}}>
                <button>
                  Edit Activity
                </button>
              </div>
              <div>
                <button id='delete-button' onClick={() => {setState({modeToOpenBox:'delete', data:data});setVisualizeOption(false)}}>
                  Delete Activity
                </button>
              </div>
            </div>
          )}
        </div>
        <div id='box-data'onClick={() => setState({ modeToOpenBox: 'view', data: data, argumentActivity: argumentActivity })}>
          {fieldDefinitions.map((fieldDef, index) => {
            const key = (fieldDef.key && fieldDef.key)
            const value = (key ? dataFinal[key] :  '');
            const displayValue = Array.isArray(value) ? value.join(', ') : String(value);

            return (
              <div key={index}>
                <Field
                  element={fieldDef.data_tag}
                  elementIndex={index} // L'indice è usato come chiave dal componente Field
                  children_p={(fieldDef.data_tag.tag === 'p' ? displayValue : undefined)}
                />
              </div>
            );
          })}
        </div>
      </div>
    ):(
      <div>
        Problemi nel reperimento dei dati dell'attività
      </div>
    ))
    
  )
}

export default Box_activity;
