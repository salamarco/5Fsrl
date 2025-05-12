
export interface userState{
    isLoggedIn: boolean,
    userData?: signUpData
}

export interface signUpData{
    personal_data: {
      username: string | undefined,
      email:string | undefined,
      password: string | undefined,
    },
    school_data:{
      scuola:string | undefined,
      indirizzo:string | undefined,
      classe:string | undefined
    } 
}

export interface dataSelect{
  id_scuola:number
  nome_scuola:string,
  indirizzi:Array<{id_indirizzo:number, nome_indirizzo:string}>,
  numero_anni:Array<string>
}

export interface dataElement{
  tag: "label" | "button" | "select" | "input" // tag che deve essere visualizzato
  text?: string; //testo che deve essere inserito in una label
  name?: string; //name del tag specifico
  type?: "submit" | "text"
  text_pre_submit?:string;
  text_post_submit?:string;
  data_options?: Array<dataSelect>
}