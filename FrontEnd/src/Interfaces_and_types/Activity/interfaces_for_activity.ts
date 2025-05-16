import {z} from 'zod'

export interface subPageState{
    modeToOpenBox: 'view' | 'edit' | 'delete' |'add'| undefined,
    data?: typeof propsCompiti | typeof propsVerifica | typeof propsPersonal | typeof propsLezioni,
    argumentActivity?: 'Personal' | 'Verifiche' | 'Lezioni' | 'Compiti'
}

export interface activityState{
    list_lezioni: Array<typeof propsCompiti>,
    list_verifiche: Array<typeof propsVerifica>,
    list_compiti: Array<typeof propsLezioni>,
    list_personali: Array<typeof propsPersonal>,
}

export const propsVerifica = z.object({
    id:z.number(),
    title:z.string(),
    date:z.string(),
    type_verifica:z.enum(["Scritta","Orale","Progetto"]),
    description:z.string()
})

export const propsCompiti = z.object({
    id:z.number(),
    title:z.string(),
    date:z.string(),
    state:z.enum(['Da iniziare','In Corso','Completato']),
    priority:z.enum(['Alta','Media','Bassa'])
})
export const propsLezioni= z.object({
    id:z.number(),
    materia:z.string(),
    date_start:z.string(),
    date_end:z.string(),
})
export const propsPersonal = z.object({
    id:z.number(),
    title:z.string(),
    date_start:z.string(),
    date_end:z.string(),
    description:z.string(),
    type:z.array(z.string())
})