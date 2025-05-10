import {z} from 'zod'
import { signUpData } from '../../../Interfaces_and_types/Manage_account/interfaces_and_types_for_access'

const responseLogInSchema = z.object({
    message:z.string().optional(),
    error:z.string().optional(),
    user:z.object({
        personal_data: z.object({username:z.string(),email:z.string(),password:z.string()}),
        school_data:z.object({scuola:z.string(),indirizzo:z.string(),classe:z.string()})
    }).optional()
}) 

//funzione che invia l'email al backend, che verifica che l'email sia registrata, se lo e' restituisce true
// se non lo e' false DA IMPLEMENTARE
export const verifyAccount: (email:string) => boolean = (email) => {
    // funzione che prende in input l'email e restituisce true se è già presente nel DB
    // oppure false se l'email non è ancora stata registrata
    return true
}

// Funzione che invia le credenziali per il Login, restituisce un ou oggetto con value false e messaggio di errore se
// le credenziali non sono valide, altrimenti restisce value true, messaggio di successo e i dati dell'utente: FINITO(da testare)
export const logInAccount: (email:string,password:string) => Promise<{value:boolean,message:string,data?:signUpData}> = (email, password) => {

    const data = {username:email,password:password}
    const headers: Headers = new Headers()
    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')

    const request: RequestInfo = new Request('/api/login', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })

    const operation = fetch(request)
    return (operation.then((res => {
        const dataValidate = responseLogInSchema.safeParse(JSON.parse(JSON.stringify(res.body)))
        if(dataValidate.success && dataValidate.data.user){
            const message = (dataValidate.data.message ? dataValidate.data.message : "Problema nel reperimento del messaggio")
            const error = (dataValidate.data.error ? dataValidate.data.error: "Problema nel reperimento dell'errore")
            if(res.status >= 400 ){
                return({value:false,message:error})
            }else if(res.status === 200){
                return({value:true,message:message,data:dataValidate.data.user})
            }else{
                return({value:false,message:"Errore a livello di funzione"})
            }
        }else{
            return({value:false,message:"Errore a livello di funzione"})
        }
    })))
    
}

// Funziona che invia i dati di registrazione, restituisce un oggetto con value true e il messaggio di successo se la registrazione
// va a buon fine, altrimenti value false e un messaggio di errore: FINITO(da testare)
export const signUpAccount: (data: signUpData) => Promise<{value:boolean,message:string}> = (data) => {

    const headers: Headers = new Headers()
    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')

    const request: RequestInfo = new Request('/api/register', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })

    const operation = fetch(request)

    return(operation.then(res => {
        const dataValidate = responseLogInSchema.safeParse(JSON.parse(JSON.stringify(res.body)))
        if(dataValidate.success){
            const message = (dataValidate.data.message ? dataValidate.data.message : "Problema nel reperimento del messaggio")
            const error = (dataValidate.data.error ? dataValidate.data.error: "Problema nel reperimento dell'errore")
            const HTTP_response:number = res.status
            return((HTTP_response >= 400 && {value:false,message:error} || HTTP_response === 200 && {value:false,message:message} || {value:false,message:"Errore a livello di funzione"}))
        }else{
            return ({value:false,message:"Errore a livello di funzione"})
        }
    }))
}

// funzione che prende le credenziali dell'account e restituisce tutti i dati relativi all'account nel formato
// che gestisce l'interfaccia signUpData DA IMPLEMENTARE
export const returnDataAccount: (email:string,password:string) => signUpData = (email,password) => {
    return ({
        personal_data: {
            username: undefined,
            email:undefined,
            password:undefined,
          },
          school_data:{
              scuola:undefined,
              indirizzo:undefined,
              classe:undefined
          }
    })
    
}