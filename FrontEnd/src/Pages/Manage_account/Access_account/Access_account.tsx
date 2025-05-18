import {useState} from 'react';
import definition_access_module from './access_module_definition.json'
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import Form from '../../../Components/Component_for_data/Form/Form.tsx';
import {z} from 'zod'
import {verifyAccount,logInAccount,signUpAccount} from './functions_for_access.ts' 
import { Link } from 'react-router';
import { signUpData} from '../../../Interfaces_and_types/Manage_account/interfaces_and_types_for_access.ts';
import './Access_account.css';
import { useAuth} from '../../../Contexts/User_context/User_context.tsx';

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
  const{state,dispatch} = useAuth()

  //scrivere funzione che controlla i dati inviati dal form, controllando che non siano nulli

  const setPersonalDataSignUp:functionForForm= (data) => {
      const dataToValidate = Object.fromEntries(data)
      const formSchema = z.object({email:z.string(),username:z.string(),password:z.string()})
      const dataValidate = formSchema.safeParse(dataToValidate)
      console.log("esegue funzione")

      if(dataValidate.success){
        console.log("dati validati")
        
        if(!verifyAccount(dataValidate.data.email)){
          console.log("collegamento con funzione funziona")
          const personalFormData: z.infer<typeof formSchema> = {
            email: dataValidate.data.email,
            username:dataValidate.data.username,
            password:dataValidate.data.password
          }
          setDataSignUp({...dataSignUp, personal_data:personalFormData})
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
        dispatch({type:'LOGIN', data:dataSignUp})
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
      //if(verifyAccount(email)){
      logInAccount(email,password).then(res => {
        if(res.value === false){
          setErrorForm({isError:true,details:res.message})
        }else{
            dispatch({type:'LOGIN', data:res.data})
        }
      })
    }else{
      setErrorForm({isError:true,details:"Problemi con il form"})
    }
  }


  return (
    <div id='accessPage'>
      {!state.isLoggedIn ? (
        <div className='access-module'>
          {(errorForm.isError && (
            <div id='error'>
              {errorForm.details}
            </div>
          ))}
          {logIn ? (
            <div className='sign-in-module'> 
              <h1>Welcome Back !</h1>
              <div className='data-form'>
                <Form
                  method_http="post"
                  data_fields={JSON.parse(JSON.stringify(definition_access_module.log_in))}
                  functionToExecute={manageLogIn}
                />
                {(errorForm.isError && (
                  <div>
                    {errorForm.details}
                  </div>
                ))}
              </div>
              <div className='button-for-sign-up'>
                <p> Non hai un account? </p>
                <button onClick={()=> isLogIn(false)} className='buttonToForm'>
                    <FaArrowRight />
                </button>
              </div>
                         
            </div>
          ):(
          <div className='sign-up-module'>
            {isFirstPage ? (
              <div className='personal-data'>
                <h1>Create Account</h1>
                <div className='data-form'>
                <Form
                  method_http="post"
                  data_fields={JSON.parse(JSON.stringify(definition_access_module.sign_up.dati_personali))} 
                  functionToExecute={setPersonalDataSignUp}
                />
                {(errorForm.isError && (
                  <div>
                    {errorForm.details}
                  </div>
                ))}
              </div>
              </div>
            ):(
              <div className='school-data'>
                <Form
                  method_http="post"
                  data_fields={JSON.parse(JSON.stringify(definition_access_module.sign_up.dati_scuola ))}
                  functionToExecute={setSchoolDataSignUp}
                />
                {(errorForm.isError && (
                  <div>
                    {errorForm.details}
                  </div>
                ))}
              </div>
            )}
            <div className='button-for-log-in'>
              <p>Torna al Log in</p>
              <button onClick={()=> isLogIn(true)} className='buttonToForm'>
                  <FaArrowLeft />
              </button>
            </div>
          </div>

          )}
        </div>
      ): (
        <div className='entered'>
          <div className='check-data'>
            <h5>Verifica i tuoi dati: </h5>
            <div className='personal-data'>

            </div>
            <div className='school-data'>

            </div>
            <div className='choose'>
              <div className='option-continue'>
                <p>se i dati visualizzati corrispondo ai tuoi </p>
                <Link to="/Dashboard">
                  <button>
                    Benvenuto in nome.app
                  </button>
                </Link>
              </div>

              <div className='log-out-or-edit'>
                <p>se i dati inseriti non corrispondono, o li vuoi modificare</p>
                <div className='buttons'>

                  <div className='button-for-edit'>
                    <Link to="/ManageAccount">
                      <button>
                        Modifica dati
                      </button>
                    </Link>
                  </div>

                  <div className='button-for-log-out'>
                    <button onClick={() => {dispatch({type:'LOGOUT'})}}>
                      Log out
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Access_account;
