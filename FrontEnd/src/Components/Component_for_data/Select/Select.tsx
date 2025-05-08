import React from 'react'
import { useState } from 'react'
import { dataSelect } from '../../../Interfaces_and_types/Manage_account/interfaces_and_types_for_access'

interface select_props{
    data_select:Array<dataSelect>| undefined
    default_element:Array<string>
}

export const Select: React.FC<select_props> = ({data_select,default_element}) => {
  const [elementSelect,setElementSelect] = useState<{value:string,index:number}>({ value:default_element[0],index: -1})

  return (
    <div id='select-group'>
        {data_select === undefined ? (
            <div>
                PROBLEMI NEL REPERIMENTO DEI DATI CI SCUSIAMO PER LA PROBLEMATICA
                RIPROVA PIU' TARDI
            </div>
        ):(
            <div>
                <select onChange={(e) => setElementSelect({value: e.target.value,index:data_select.findIndex(item => item.nome_scuola === e.target.value )})}>
                    {data_select.map((root,rootIndex) => (
                        (rootIndex === 0) ? (
                            <option key={rootIndex} value="default">
                                {default_element[0]}
                            </option>
                        ):(
                            <option key={rootIndex} value={root.nome_scuola}>
                                {root.text}
                            </option>
                        )
                    ))}
                </select>
                {elementSelect.index !== -1 && (
                    <div id='children-select-group'>
                        <select>
                            {data_select[elementSelect.index].indirizzi.map((children,childrenIndex) => (
                                (childrenIndex === 0) ? (
                                    <option key={childrenIndex} value="default">
                                        {default_element[1]}
                                    </option>
                                ):(
                                    <option key={childrenIndex} value={children.nome_indirizzo}>
                                        {children.text_indirizzo}
                                    </option>
                                )
                            ))}
                        </select>
                        <select>
                            {data_select[elementSelect.index].n_years.map((children,childrenIndex) => (
                                (childrenIndex === 0) ? (
                                    <option key={childrenIndex} value="default">
                                        {default_element[2]}
                                    </option>
                                ):(
                                    <option key={childrenIndex} value={children}>
                                        {children}
                                    </option>
                                )
                            ))}
                        </select>
                    </div>
                )}
            </div>
        )}
    </div>
  )
}

export default Select;