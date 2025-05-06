import {useState} from 'react';
import definition_access_module from './access_module_definition.json'
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import Form from '../../../Components/Component_for_data/Form/Form.tsx';
import {z} from 'zod'
import {verifyAccount,logInAccount,signUpAccount,returnDataAccount} from './functions_for_access.ts' 
import { Link } from 'react-router';
import { signUpData } from '../../../Interfaces_and_types/Manage_account/interfaces_and_type_for_access.ts';

// PROBLEMA NEL PASSAGGIO DELLE PROPS AL COMPONENTE FORM 

const defaultSignUpState: signUpData = {
  personal_data:{
    username:undefined,
    email:undefined,
    password:undefined,
  },
  school_data:{
    scuola:undefined,
    indirizzo: undefined,
    classe:undefined
  }
}

type functionForForm = (data: FormData) => void;

export const Access_account = () => {

  const [logIn, isLogIn] = useState<boolean>(true);
  const[isFirstPage,setIsFirstPage] = useState<boolean>(true);
  const [dataSignUp,setDataSignUp] = useState<signUpData>(defaultSignUpState)
  const[errorForm,setErrorForm] = useState<{isError:boolean,details:string}>({isError: false,details:""})
  const[isAccessComplete,setIsAccessComplete] = useState<boolean>(false)

  //scrivere funzione che controlla i dati inviati dal form, controllando che non siano nulli

  const setPersonalDataSignUp:functionForForm= (data) => {
      const dataToValidate = Object.fromEntries(data)
      const formSchema = z.object({email:z.string(),username:z.string(),password:z.string()})
      const dataValidate = formSchema.safeParse(dataToValidate)

      if(dataValidate.success){
        
        if(!verifyAccount(dataValidate.data.email)){
          const personalFormData: z.infer<typeof formSchema> = {
            email: dataValidate.data.email,
            username:dataValidate.data.username,
            password:dataValidate.data.password
          }
          setDataSignUp({...dataSignUp, personal_data:personalFormData})
          //qua poi si dovra' chiamare la funzione per impostare un contesto con i dati dell'account
        }else{
          setErrorForm({isError:true,details:"L'email usata e' gia' registrata con un account"})
        }
      }else{
        setErrorForm({isError:true,details:"Problemi nell'applicazione,riprova piu' tardi"})
      }
    setIsFirstPage(false);
  }

  const setSchoolDataSignUp: functionForForm = (data) => {
      const dataToValidate = Object.fromEntries(data)
      const formSchema = z.object({scuola:z.string(),indirizzo:z.string(),classe:z.string()})
      const dataValidate = formSchema.safeParse(dataToValidate)

      if(dataValidate.success){
        const schoolFormData: z.infer<typeof formSchema> = {
          scuola: dataValidate.data.scuola,
          indirizzo:dataValidate.data.indirizzo,
          classe:dataValidate.data.classe
        }
        setDataSignUp({...dataSignUp, school_data:schoolFormData})
        signUpAccount(dataSignUp)
        //qua poi si dovra' chiamare la funzione per impostare un contesto con i dati dell'account
        setIsAccessComplete(true)
      }else{
        setErrorForm({isError:true,details:"Problemi nell'applicazione,riprova piu' tardi"})
      }
    }

  const manageLogIn:functionForForm = (data) => {
      const dataToValidate = Object.fromEntries(data)
      const formSchema = z.object({email:z.string(),password:z.string()})
      const dataValidate = formSchema.safeParse(dataToValidate)

      if(dataValidate.success){
        const email:string = dataValidate.data.email
        const password:string = dataValidate.data.password 
        if(verifyAccount(email)){
          if(logInAccount(email,password)){
            const dataAccount = returnDataAccount(email,password)
            //funzione per settare il contesto con i dati ottenuti\
            setIsAccessComplete(true)
          }
        }
      }else{
        setErrorForm({isError:true,details:"Problemi nell'applicazione,riprova piu' tardi"})
      }
    }

  return (
    <div id='accessPage'>
      {!isAccessComplete ? (
        <div className='access-module'>
          {logIn ? (
            <div className='sign-in-module'> 
              <div className='data-form'>
                <Form
                  method_http="post"
                  data_fields={definition_access_module.log_in}
                  function_to_excute={manageLogIn}
                />
                {errorForm.isError && (
                  <div>
                    {errorForm.details}
                  </div>
                )}
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
            {isFirstPage ? (
              <div className='personal-data'>
                <Form
                  method_http="post"
                  data_fields={definition_access_module.sign_up.dati_personali} 
                  function_to_excute={setPersonalDataSignUp}
                />
                {errorForm.isError && (
                  <div>
                    {errorForm.details}
                  </div>
                )}
              </div>
              
              ):(
              <div className='school-data'>
                <Form
                  method_http="post"
                  data_fields={definition_access_module.sign_up.dati_scuola}
                  function_to_excute={setSchoolDataSignUp}
                />
                {errorForm.isError && (
                  <div>
                    {errorForm.details}
                  </div>
                )}
              </div>
            )}
            <div className='button-for-log-in'>
              <p>Torna al Log in</p>
              <button onClick={()=> isLogIn(true)}>
                  <FaArrowLeft />
              </button>
            </div>
          </div>
          )}
        </div>
      ): (
        <div>
          <Link to="/Dashboard">
            <button>
              Benvenuto in nome.app
            </button>
          </Link>
        </div>
      )}

    </div>
  )
}

export default Access_account;
