import Field from '../Field/Field.tsx'
import { useFormStatus } from 'react-dom'
import Select from '../Select/Select.tsx'
import { dataElement } from '../../../Interfaces_and_types/Manage_account/interfaces_and_type_for_access.ts';

interface form_props {
    method_http:'get' | 'post';
    data_fields: Array<dataElement>
    function_to_excute: (data: FormData) => void
    urlAPI?:URL
}

export const Form: React.FC<form_props> = ({method_http,function_to_excute,data_fields}) => {

    const {pending,data}= useFormStatus()

    // implementare parte di presa dei dati delle scuole dal backend, con la funzione fetchSchoolData
    // che restituisce i dati delle scuole nel formato di dataSelect, poi il form gestisce la visualizzazione delle
    // varie opzioni di anni e indirizzi in base alla scuola che viene selezionata
    // adesso e' delegata al componente select ma cambiera' la gestione passando al componente form

  return (
    <form method={method_http} action={() => {
        if(data !== null){
            function_to_excute(data)
        }
    }}>
        {data_fields.map((element,elementIndex) => (
            (element.tag === "select")? (
                <Select 
                    data_select={(element.data_options ? element.data_options : undefined)}
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
  )
}
export default Form;
