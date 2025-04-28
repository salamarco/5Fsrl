import Auth_module from '../../../Components/Authentication_module/Authentication_module.tsx';
import {useState} from 'react';
import definition_access_module from './access_module_definition.json' // json che raccoglie i dati relativi ai moduli di sign-in e sign-up
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

/*
l'idea e' di avere il componente Auth_module per gestire la visualizzazione dei campi del form, l'invio dei dati
al backend per la verifica delle credenziali e la restituzione dell'esito, per fare questo essendo che c'e' una differenza
di numero di campi, nomi, tipo e anche di metodo di richiesta che deve essere inviata al backend tra sign-in e sign-up
e' necessario passare al componente quali sono i campi da visualizzare nel form, dunque il loro tipo e la loro label
inoltre al componente va anche passato quale tipo di richiesta HTTP deve inviare al backend, e nel caso del sign-up sarebbe 
anche da includere un modo per gestire un bottone nel modulo per avere piu' 'sotto pagine ' per gestire i campi di inserimento
*/

export const Access_account = () => {
  const [logIn, isLogIn] = useState<boolean>(true);

  return (
    <div className='access-module'>
      {logIn ? (
        <div className='sign-in-module'> 
          <div className='data-form'>
            <Auth_module 
            form_data={definition_access_module.log_in}
            Auth={logIn}
            />
          </div>
          <div className='button-for-sign-up'>
            <p> Non hai un account? </p>
            <button onClick={()=> isLogIn(false)}>
                <FaArrowRight />
            </button>
          </div>
        </div>
      ):(
        <div className='sign-up-module'>
          <div className='data-form-sign-up'>
            <Auth_module 
              form_data={definition_access_module.sign_up} 
              Auth={logIn}
            />
              
          </div>
          <div className='button-for-log-in'>
            <p>Torna al Log in</p>
            <button onClick={()=> isLogIn(true)}>
                <FaArrowLeft />
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

export default Access_account;
