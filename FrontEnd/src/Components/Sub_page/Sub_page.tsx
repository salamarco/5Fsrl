import Filters from '../Component_for_data/Filters/Filters';
import Box_activity from '../Boxes/Box_activity/Box_activity';
import { useState } from 'react';
import { propsCompiti,propsLezioni,propsPersonal,propsVerifica } from '../../Interfaces_and_types/Activity/interfaces_and_types_for_activity';

interface subPage_props{
  argument: string,
  propsSchema: typeof propsCompiti | typeof propsVerifica | typeof propsLezioni | typeof propsPersonal | undefined
  functionForReturn: (value:string) => void 
}
export const Sub_page: React.FC<subPage_props> = ({propsSchema}) => {
  //fetchare i dati dal back end, con url passato con l'argument, presi
  // i dati vanno passati passiamo l'elenco delle properties 
  const [valueFilter,setValueFilter] = useState<{properties:string,value:string}>({properties:"",value:""})

  //const propsSchemaToUse: () => boolean = () => {
    // funzione che controlla che i dati fetchati rispettino le schema
    // se lo rispetta restituisce true altrimenti false
  //}

  return (
    (propsSchema ? (
      <div id='subPage'>
        <div id='filters'>
          <Filters 
          
          />
        </div>

        <div id='boxes'>
          {(valueFilter.value === "" ? (
            <div id='all-activity'>
              <Box_activity />
            </div>
            
            // qua va stampato tutto l'elenco delle attività che recuperate dalla funzione che fetcha i dati
            // vengono mappati i dati che sono restituiti e passati a Box_activity che visualizza le properties
          ): (
            <div id='filtered-activity'>
              <Box_activity />
            </div>
            // qua prima di passare i dati delle singole attività al Box_activity si passa l'attività alla funzione,
            // si verifica che rispetti lo schema dell'attività che visualizza la subPage, ad esempio Verifiche, verifica
            // che rispetta verificaSchema(definito in interfaces con zod), se lo rispetta verifica che la properties e il 
            // suo valore siano uguali al filtro applicato
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
