import { Ensure, equals } from '@serenity-js/assertions'
import { actorInTheSpotlight } from '@serenity-js/core'
import { GetRequest, LastResponse,Send } from '@serenity-js/rest'

import { actorMemories } from '../../../constants/actorMemories'
import { constants } from '../../../constants/constants'
import { endPoints } from '../../../constants/endPoints'
import { httpCodes } from '../../../constants/httpCodes'
import { availableProductsData, availableProductsResponse } from '../../../dtos/common/availableProducts/availableProductsResponse'
import { recall, remember } from '../../../helpers/actorMemory'
import { callAnApi } from '../../../helpers/callApi'
import { configs } from '../../../helpers/configs'
import { finishTest } from '../../../helpers/finishTest'

export const availableProducts = {
    byWarehouse : async (warehouseId : number) => {
    
        const idToken : string = await recall(actorMemories.idToken)
    
        await callAnApi(
            Send.a(
                GetRequest.to(endPoints.availableProducts)
                .using({timeout: constants.apiDefaultTimeOut , headers:{authorization: `Bearer ${idToken}`, warehouse : warehouseId, ...configs.apiDefaultHeaders}})
            )
        )  
        
        await actorInTheSpotlight().attemptsTo(
            Ensure.that(LastResponse.status(), equals(httpCodes.OK)),            
        )            
        
        const response : availableProductsResponse = await actorInTheSpotlight().answer(LastResponse.body<availableProductsResponse>())
        
        const productWithStock : availableProductsData[] = response.data.filter(data => data.quantity > 0)
                                                                        .sort((a,b) => b.quantity - a.quantity)
        
        await remember(actorMemories.availableProduct, productWithStock)
        await remember(actorMemories.productName, productWithStock[0].name)        
        
        return finishTest()
    }
}