import Field from '../Field/Field.tsx'
import { useFormStatus } from 'react-dom'
import Select from '../Select/Select.tsx'
import { dataElement, dataSelect } from '../../../Interfaces_and_types/Manage_account/interfaces_and_types_for_access.ts';
import { useEffect, useState } from 'react';

interface form_props {
    method_http:'get' | 'post';
    data_fields: Array<dataElement> | undefined
    functionToExecute: (data: FormData) => void
    urlAPI?:URL
    functionForSignUp?:(value:boolean) => void
}

export const Form: React.FC<form_props> = ({method_http,functionToExecute,data_fields}) => {

    const {pending,data}= useFormStatus()
    const [dataSelect,setDataSelect] = useState<dataSelect[]>()

    useEffect(()=> {
         const fetchDataActivity = async () => {
        const data = await fetch("https://api/schools", { 
          method: "GET"
        });
        const jsonData = await data.json();

        setDataSelect(jsonData.json)
      };
      fetchDataActivity();
    },[])

    
  return (
    (data_fields ? (
        <form method={method_http} action={(data !== null && functionToExecute(data) || undefined)}>
            {data_fields.map((element,elementIndex) => (
                (element.tag === "select")? (
                    <Select 
                        data_select={(element.data_options && element.data_options || dataSelect ? dataSelect : undefined)}
                        default_element={["Inserisci Scuola","Inserisci Indirizzo", "Inserisci Classe"]}
                    />
                ):(
                    <Field
                        element={element}
                        elementIndex={elementIndex}
                        state_disabled={pending}
                    />
                )
            ))}
        </form>
    ):(
        <div>
            PROBLEMI CON IL REPERIMENTO DEI DATI DELLA PAGINA 
        </div>

    ))
  )
}
export default Form;
