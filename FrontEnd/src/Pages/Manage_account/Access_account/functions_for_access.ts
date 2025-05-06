import {z} from 'zod'
import { signUpData } from '../../../Interfaces_and_types/Manage_account/interfaces_and_type_for_access'

const dataSelectSchema = z.object({
    nome_scuola:z.string(),
    text:z.string(),
    indirizzi:z.array(z.object({nome_indirizzo:z.string(),text_indirizzo:z.string()})),
    n_years:z.array(z.string())
})

const dataAPItype = z.array(dataSelectSchema)

//funzione che restituisce i dati delle scuole presi dall'API del backend
export const fetchSchoolData = async() => {
    const urlAPI = ''
    try {
        const response = await fetch(urlAPI);
        if (!response.ok) {
            throw new Error(`Errore HTTP: ${response.status}`);
        }
        const jsonData = await response.json();
    
        // 4. VALIDAZIONE CON ZOD!
        // .parse() lancia un errore se la validazione fallisce
        const validatedData = dataAPItype.parse(jsonData);
    
        // Se arriva qui, i dati sono validi e conformi allo schema (e quindi all'interfaccia)
        return(validatedData)
    
    } catch (err) {
        console.log(err)
        return undefined
    }
}

//funzione che invia l'email al backend, che verifica che l'email sia registrata, se lo e' restituisce true
// se non lo e' false DA IMPLEMENTARE
export const verifyAccount: (email:string) => boolean = (email) => {
    // funzione che prende in input l'email e restituisce true se è già presente nel DB
    // oppure false se l'email non è ancora stata registrata
    return true
}

//funzione che invia le credenziali di accesso al form e verifica che siano valide, se lo sono restituisce true
// altrimenti restituiusce false DA IMPLEMENTARE
export const logInAccount: (email:string,password:string) => boolean = (email, password) => {
    //funzione che prende in input l'email e la password e verifica restituisce
    // json con un messaggio di errore se le credenziali non sono valide
    // oppure un json con tutti i dati dell'utente
    return true
}

// funzione che invia i dati per la registrazione al backend, se va a buon fine restituisce true altrimenti
// restituisce false  DA IMPLEMENTARE
export const signUpAccount: (data: signUpData) => boolean = (data) => {
    // funzione che prende in input tutti i dati dell'utente e lo registra
    // restituisce true se è andata a buon fine oppure false se non è andata bene
    return true
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