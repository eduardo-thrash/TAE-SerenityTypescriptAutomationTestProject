import { Ensure, equals, isTrue } from '@serenity-js/assertions'
import { actorInTheSpotlight, Duration, TestCompromisedError } from '@serenity-js/core'
import { GetRequest, LastResponse, Send } from '@serenity-js/rest'
import { Wait } from '@serenity-js/webdriverio'

import { actorMemories } from '../../../constants/actorMemories'
import { constants } from '../../../constants/constants'
import { endPoints } from '../../../constants/endPoints'
import { GetShoppingCartResponse } from '../../../dtos/shoppingCart/getShoppingCartResponse'
import { recall } from '../../../helpers/actorMemory'
import { callAnApi } from '../../../helpers/callApi'
import { configs } from '../../../helpers/configs'
import { finishTest } from '../../../helpers/finishTest'

export const getShoppingCartInfo = {
    for: async () => {
        const idToken: string = await recall(actorMemories.idToken)
        //const shoppingCartSubtotal : number = await recall(actorMemories.shoppingCartSubtotal)
        
        let carResponse : GetShoppingCartResponse = await getShoppingCartInfo.getCarInfo(idToken)        
        
        while(carResponse.status !== 'OK') {
            Wait.for(Duration.ofSeconds(1))
            carResponse = await getShoppingCartInfo.getCarInfo(idToken)
        }

        await actorInTheSpotlight().attemptsTo(
        //    Ensure.that(carResponse.carts[0].total, equals(shoppingCartSubtotal))
        //        .otherwiseFailWith(TestCompromisedError, 'The shopping cart total amount is not equal to expected value'), 
            Ensure.that(carResponse.carts[0].hasCompleteMinimumOrder, isTrue())
                .otherwiseFailWith(TestCompromisedError, 'The shopping cart total amount has not reached the minimum order value yet'),
            Ensure.that(carResponse.status, equals(constants.shoppingCartOkStatus))
                .otherwiseFailWith(TestCompromisedError, 'The shopping cart status is not equal to "OK"'),
        )

        return finishTest()
    },
    
    getCarInfo: async (idToken: string) : Promise<GetShoppingCartResponse>  => {
        await callAnApi(
            Send.a(
                GetRequest.to(endPoints.getShoppingCartInfo.replace('{{store_id}}', await recall(actorMemories.storeId)))
                .using({timeout : constants.apiDefaultTimeOut, headers :{authorization: `Bearer ${idToken}`, ...configs.apiDefaultHeaders} })
            )
        )

        return await actorInTheSpotlight().answer(LastResponse.body<GetShoppingCartResponse>())
    }
}