import { actorInTheSpotlight, Note,Question, TakeNote } from '@serenity-js/core'

export const rememberValue = (value : any) =>
    Question.about('remember value', actor => {
        return value
    })

export const remember = async (title : string , value : any) => await actorInTheSpotlight().attemptsTo(TakeNote.of(rememberValue(value)).as(title))

export const recall : any = async (title : string) => await actorInTheSpotlight().answer(Note.of(title))
