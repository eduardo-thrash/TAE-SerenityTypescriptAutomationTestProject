import { actorInTheSpotlight } from '@serenity-js/core'

export const resolve = async(id : any) => {
    return actorInTheSpotlight().answer(id)
}