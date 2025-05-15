import {z} from 'zod'
import { dataElement } from '../Manage_account/interfaces_and_types_for_access';

export const filterData = z.object({
    title:z.string(),
    name: z.string(),
    options:z.array(z.object({value:z.string(),title:z.string()}))
})

export interface dataFromFilterJSON {
    Verifiche: Array<typeof filterData>,
    Lezioni: Array<typeof filterData>,
    Compiti: Array<typeof filterData>,
    Personal: Array<typeof filterData>,
}

export interface boxFieldDefinition {
  key?: 'title' | 'date' | 'type_verifica' | 'description' | 'date_start'|'date_end' | 'state' | 'priority' | 'materia' | 'type',
  data_tag: dataElement,
}

export interface activityFieldDefinitions {
  Compiti?: boxFieldDefinition[];
  Verifiche?: boxFieldDefinition[];
  Lezioni?: boxFieldDefinition[];
  Personal?: boxFieldDefinition[];
}