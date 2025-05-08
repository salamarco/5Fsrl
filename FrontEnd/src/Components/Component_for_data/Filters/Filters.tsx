import React from 'react';
import {filterData} from '../../../Interfaces_and_types/Activity/interfaces_and_types_for_data'


interface filtersProps{
  listFilter: Array<typeof filterData> | undefined,
  functionForSetFilter:(data:{properties: string,value:string}) => void
}

export const Filters: React.FC<filtersProps> = ({listFilter}) => {
  return (
    (listFilter ? (
      <div id='list-filters'>
      {listFilter.map((element,elementIndex) => (
        <div id='filter'>
          // qua va inserito il componente Select, passando i dati del filtro,
          // deve visualizzare il nome del filtro e le opzioni tra cui si possono scegliere
          // POST ridesign del componente Select
        </div>
      ))}

    </div>
    ): (
      <div>
        Problemi con la visualizzazione dei filtri

      </div>
    ))
  )
}

export default Filters;