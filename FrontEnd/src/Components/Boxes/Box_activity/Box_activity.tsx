import { propsCompiti,propsLezioni,propsVerifica,propsPersonal } from '../../../Interfaces_and_types/Activity/interfaces_and_types_for_data';
import { HiDotsHorizontal } from "react-icons/hi";
import React from 'react';
import { useEffect } from 'react';

interface propsBoxActivity{
  data: typeof propsCompiti | typeof propsVerifica | typeof propsLezioni | typeof propsPersonal | undefined,
}

export const Box_activity: React.FC<propsBoxActivity> = ({data}) => {

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
          <button> 
            <HiDotsHorizontal/>
          </button>
        </div>
        <div id='box-data'>
          
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
