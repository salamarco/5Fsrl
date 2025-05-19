import { useSubPage } from '../../../Contexts/SubPage_context/SubPage_context'
import {functionForAddActivity, functionForDeleteActivity,functionForEditActivity} from '../../../Pages/Activity/fucntions_for_manage_activity'
import Field_activity_definition from '../../../Pages/Activity/Field_activity_definition.json'
import { activityFieldDefinitions } from '../../../Interfaces_and_types/Activity/interfaces_for_definition';
import { propsCompiti,propsLezioni,propsVerifica,propsPersonal } from '../../../Interfaces_and_types/Activity/interfaces_for_activity';
import Field from '../Field/Field';

const Modal = () => {
  const {state} = useSubPage();
  const modeModal = state.modeToOpenBox
  const dataModal = state.data
  const argumentActivity = state.argumentActivity

    const modalDefinitionParse = Field_activity_definition as  activityFieldDefinitions
    const modalDefinitions = argumentActivity ? modalDefinitionParse[argumentActivity] : undefined

    let schemaForParse = undefined
    let dataParse = undefined
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let dataFinal: { [key: string]: any } | undefined = undefined

    if(modeModal === 'view' || modeModal=== 'edit'){
      schemaForParse = argumentActivity ? (argumentActivity === 'Compiti' && propsCompiti || argumentActivity === 'Lezioni' && propsLezioni || argumentActivity === 'Verifiche' && propsVerifica || argumentActivity === 'Personal' && propsPersonal ) : undefined
      dataParse = schemaForParse ? schemaForParse.safeParse(dataModal) : undefined
      dataFinal = dataParse?.data ? dataParse.data : undefined
    }

  return (
    <div id='modal'>
      {modalDefinitions && modeModal ? (
        <div id='box-data'>
          <form action={() => {
            if(modeModal === 'edit'){
              functionForEditActivity()
            }else if(modeModal === 'delete'){
              functionForDeleteActivity()
            }else if(modeModal === 'add'){
              functionForAddActivity()
            }
          }}>
            {modalDefinitions[modeModal].map((fieldDef, index) => {

              if(dataFinal){
                const key = (fieldDef.key && fieldDef.key)
                const value = (key ? dataFinal[key] :  '');
                const displayValue = Array.isArray(value) ? value.join(', ') : String(value);
                return (
                <div key={index}>
                  <Field
                    element={fieldDef.data_tag}
                    elementIndex={index}
                    children_p={(fieldDef.data_tag.tag === 'p' || fieldDef.data_tag.tag === 'label'  ? displayValue : undefined)}
                  />
                </div>
                );
              }else{
                <Field
                  element={fieldDef.data_tag}
                  elementIndex={index}
                />
              }
            })
          }
        </form>
      </div>
      ):(
        <div>
          problemi con la presa dei dati dei campi dei dati
        </div>
      )}
    </div>
  )
}

export default Modal