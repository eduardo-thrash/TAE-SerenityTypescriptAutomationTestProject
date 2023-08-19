import { Ensure, equals, isLessThan } from '@serenity-js/assertions'
import { actorInTheSpotlight, TestCompromisedError } from '@serenity-js/core'
import { LastResponse } from '@serenity-js/rest'

import { actorMemories } from '../constants/actorMemories'
import { recall } from './actorMemory'
import { finishTest } from './finishTest'

export const apiAsserts = {
    successResponse : async (statusCode : number) => {
        await actorInTheSpotlight().attemptsTo(
            Ensure.that(LastResponse.status(), equals(statusCode)).otherwiseFailWith(TestCompromisedError, `The api status code returned was ${LastResponse.status().answeredBy(actorInTheSpotlight())} and should be ${statusCode} for the test goals`)
        )

        return finishTest()
    },

    timeResponse : async (timeResponse : number) => {
        const apiTimeResponse = await recall(actorMemories.timeResponse)/1000
        await actorInTheSpotlight().attemptsTo(
            Ensure.that(apiTimeResponse, isLessThan(timeResponse)).otherwiseFailWith(TestCompromisedError, `The api time response was ${apiTimeResponse}, remember the api time reponse should be less than ${timeResponse} for the test goals`)
        )

        return finishTest()
    }
}