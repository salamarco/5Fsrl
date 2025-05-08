import {z} from 'zod'

export const propsVerifica = z.object({
    title:z.string(),
    date:z.string(),
    type_verifica:z.enum(["Scritta","Orale","Progetto"]),
    description:z.string()
})

export const propsCompiti = z.object({
    title:z.string(),
    date:z.string(),
    state:z.enum(['Da iniziare','In Corso','Completato']),
    priority:z.enum(['Alta','Media','Bassa'])
})
export const propsLezioni= z.object({
    materia:z.string(),
    date_start:z.string(),
    date_end:z.string(),
})
export const propsPersonal = z.object({
    title:z.string(),
    date_start:z.string(),
    sate_end:z.string(),
    description:z.string(),
    type:z.array(z.string())
})

export const filterData = z.object({
    title:z.string(),
    name: z.string(),
    options:z.array(z.object({value:z.string(),title:z.string()}))
})