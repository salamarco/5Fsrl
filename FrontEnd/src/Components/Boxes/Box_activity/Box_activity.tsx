import { propsCompiti,propsLezioni,propsVerifica,propsPersonal } from '../../../Interfaces_and_types/Activity/interfaces_and_types_for_data';
import { HiDotsHorizontal } from "react-icons/hi";
import React from 'react';
import { useEffect,useState } from 'react';
import { useSubPage } from '../../../Contexts/SubPage_context/SubPage_context';

interface propsBoxActivity{
  data: typeof propsCompiti | typeof propsVerifica | typeof propsLezioni | typeof propsPersonal | undefined,
  argumentActivity?: 'Personal' | 'Verifiche' | 'Lezioni' | 'Compiti'
}

export const Box_activity: React.FC<propsBoxActivity> = ({data,argumentActivity}) => {
  const [visualizeOption,setVisualizeOption] = useState<boolean>(false)
  const{setState} = useSubPage()

  //funzione per la visualizzazione dei box si può rivedere
  useEffect (() => {
    const printDataActivity = () => {
      const container = document.getElementById('box-data')
      if(container){
        for (const props in data) {
          const tag = document.createElement('p'); // o qualsiasi tag HTML desideri
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          tag.textContent = (data as any)[props]; // Imposta il contenuto del tag
          container.appendChild(tag);
        }
      }
    }
    printDataActivity()
  }, [data]);
  
  return (
    (data ? (
      <div id='box/activity'>
        <div button-box>
          {(visualizeOption) ? (
            <button onClick={() => setVisualizeOption(true)}> 
              <HiDotsHorizontal/>
            </button>
          ):(
            <div id='options'>
              //inserire anche come dati da passare l'id dell'attivita', l'id va messo come props dei vari PropsPersonal, propsVerifica ...
              // si prende l'id dell'activity e si mette nel contesto del subPage
              <div id='edit-button'  onClick={() => setState({modeToOpenBox:'edit', data:data,argumentActivity:argumentActivity})}>
                <button>
                  Edit Activity
                </button>
              </div>
              <div>
                <button id='delete-button' onClick={() => setState({modeToOpenBox:'delete', data:data})}>
                  Delete Activity
                </button>
              </div>
            </div>
          )}
        </div>
        <div id='box-data' onClick={() => setState({modeToOpenBox:'view', data:data})}>
          
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
