import { useState } from 'react';
import { FaArrowRight} from "react-icons/fa6";
import school_data from './prova_school_data.json'

/*
 cose da fare per componente Auth_module, in ordine di importanza:
 - Implementare controllo dei dati inseriti nella prima pagina del sign-up, con una funzione]
  che una volta controllati i dati dia true o false e inneschi il cambiamento dello state isFirstPage

 - Completo ridesign del componente in particolare della parte di select e della visualizzazione condizionale dei
   menu' a tendina, ma anche migliore generalizzazione del componente, piu' flessibile e eliminare codice inefficiente
   della funzione renderTag()

 - Guardare per gestione e presa dei dati dal form,gestione, controllo e invio alle funzioni che gestiscono
   l'interfacciamento con il backend

 - Inziare a definire e implementare le funzioni per l'interfacciamento con il backend, che avvera' in tre parti:
    - reperimento dei dati sulle scuole, indirizzi e classi della scuola
    - invio dei dati di log-in per la verifica
    - invio dei dati della registrazione controllando che l'account non sia gia' registrato
      e registrandolo se non lo fosse

*/

interface form_data_type{
  tag: string; // tag che deve essere visualizzato
  text?: string; //testo che deve essere inserito in una label, o in un bottone ...
  name?: string; //name del tag specifico
  type?: string;
}

interface Auth_module_props{
  form_data: Array<form_data_type>;
  Auth: boolean
}

export const Authentication_module: React.FC<Auth_module_props> = ({form_data,Auth}) => {

  const[isFirstPage,setIsFirstPage] = useState<boolean>(true);
  const[school_selected,setSchoolSelected] = useState<string>();

  const renderTag = (element: form_data_type,elementIndex:number) => {
    const TagName = element.tag
    if(TagName === 'label'){
      return(
        <TagName key= {elementIndex}>{element.text}</TagName>
      )
    }
    
    else if (TagName === 'input') {
      return(
        <TagName key= {elementIndex} name={element.name} required type={element.type}/>
      )
    }
    
    
    else if(TagName === 'select'){
      const n_elemento = school_data.data.findIndex(item => item.nome_scuola === school_selected)
      
      if(element.name === 'scuola'){
        return(
          <TagName key={elementIndex} name={element.name} onChange={(e) => setSchoolSelected(e.target.value)}>
            <option value= "default">Scuola</option>
            {school_data.data.map((school,schoolIndex) => (
              <option key={schoolIndex} value={school.nome_scuola}>
                {school.nome_scuola}
              </option>
            ))}
          </TagName>
        )
      }
      else if(element.name === 'indirizzo' && school_selected != undefined){
        return(
          <TagName key={elementIndex} name={element.name}>
            {school_data.data[n_elemento].indirizzi.map((address,addressIndex) => (
              <option key= {addressIndex} value={address.nome}>
                {address.nome}
              </option>
            ))}
          </TagName>
        )
      }
      
      else if(element.name === 'classe'  && school_selected != undefined){
        return(
          <TagName key={elementIndex} name={element.name}>
            {school_data.data[n_elemento].anni_possibili.map((year,yearIndex) => (
              <option key= {yearIndex} value={year}>
                {year}
              </option>
            ))}
          </TagName>

        )
      }
    }
  }

  return (
    <div className='Auth-module'>
      {!Auth ? (
        <form>
          {form_data.map((element,elementIndex) =>(
            <>
              {renderTag(element,elementIndex)}
              
            </>
          ))}
          <button type='submit'> Invia </button>
        </form>
      ): (
        <>
          {isFirstPage ? (
            <form>
              {form_data.map((element,elementIndex) =>(
                <>
                  {renderTag(element,elementIndex)}
                  
                </>
              ))}
              <button type='submit' onClick= {()=> setIsFirstPage(false)}> <FaArrowRight /> </button>
            </form>
          ):(
            <form>
                {form_data.map((element,elementIndex) => (
                  <>
                   {renderTag(element,elementIndex)}
                   
                  </>
                ))}
                <button type='submit'> Registrati </button>
            </form>
          )}
        </>
      )}
    </div>
  )
}

export default Authentication_module;
