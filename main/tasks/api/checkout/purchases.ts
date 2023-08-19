import { actorInTheSpotlight } from '@serenity-js/core'
import { LastResponse, PostRequest, Send } from '@serenity-js/rest'

import { actorMemories } from '../../../constants/actorMemories'
import { constants } from '../../../constants/constants'
import { endPoints } from '../../../constants/endPoints'
import { httpCodes } from '../../../constants/httpCodes'
import { PurchaseCartPayloadBuilder, PurchasePayloadBuilder } from '../../../dtos/checkout/builders/purchasePayloadBuilder'
import { PurchaseCartPayload, PurchasesPayload } from '../../../dtos/purchasesPayload'
import { PurchasesResponse } from '../../../dtos/purchasesResponse'
import { recall, remember } from '../../../helpers/actorMemory'
import { apiAsserts } from '../../../helpers/apiAsserts'
import { callAnApi } from '../../../helpers/callApi'
import { configs } from '../../../helpers/configs'
import { finishTest } from '../../../helpers/finishTest'

export const purchases = {
    to : async () => {
        const purchasesPayload : PurchasesPayload = {cart : [], orderOriginAppId : 2, sessionId : constants.sessionId, couponCode : ' ', surchargesData : constants.surchargesData, cartId : undefined, creditChecked : false, debitChecked : true, reserveUid : constants.reserveUid }

        const elapseTime = await callAnApi(
            Send.a(
                PostRequest.to(endPoints.purchases.replace('{{store_id}}', await recall(actorMemories.storeId)))
                .with(JSON.stringify(purchasesPayload))
                .using({timeout : constants.apiDefaultTimeOut, headers : configs.apiDefaultHeaders})
            )
        )
        
        const response : PurchasesResponse = await actorInTheSpotlight().answer(LastResponse.body<PurchasesResponse>())

        await remember(actorMemories.timeResponse, elapseTime)
        await remember(actorMemories.purchaseUid, response.purchaseUid)

        return finishTest()
    },
    performPurchase: async (idToken : string, storeId : string, productId : number) : Promise<PurchasesResponse> => {
        const purchaseCartPayload : PurchaseCartPayload[] = PurchaseCartPayloadBuilder(constants.purchaseFrom, productId)
        const purchasesPayload : PurchasesPayload = PurchasePayloadBuilder(purchaseCartPayload, process.env.SESSION_ID, process.env.SEARCH_ID, false, false)

        await callAnApi(
            Send.a(
                PostRequest.to(endPoints.purchases.replace('{{store_id}}', await recall(actorMemories.storeId)))
                .with(JSON.stringify(purchasesPayload))
                .using({timeout : constants.apiDefaultTimeOut, headers :{authorization: `Bearer ${idToken}`, ...configs.apiDefaultHeaders} })
            )
        )

        await apiAsserts.successResponse(httpCodes.OK)

        const purchasesResponse : PurchasesResponse = await actorInTheSpotlight().answer(LastResponse.body<PurchasesResponse>())

        return purchasesResponse
    }
}