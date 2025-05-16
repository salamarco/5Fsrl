//import { useSubPage } from '../../../Contexts/SubPage_context/SubPage_context'
import {functionForDeleteActivity,functionForEditActivity} from '../../../Pages/Activity/fucntions_for_manage_activity'

const Modal = () => {
  //const {state} = useSubPage();

  return (
    <div id='modal'>
      <div id='delete-modal'>
        <div>
          <p> 
            Sei sicuro di voler eliminare questa attivita'?
             non sara' recuperabile
          </p>
          <button onClick={() => functionForDeleteActivity()}>
            elimina attivita'
          </button>
        </div>
      </div>
      <div id='edit-modal'>
        <div id='box-manage-data'>
          <div>
            qua va inserito il form che si occupa di far visualizzare i dati gia'
            presenti e dare la possibilita' di cambiarli
            <button onClick={() => functionForEditActivity()}>

            </button>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Modal