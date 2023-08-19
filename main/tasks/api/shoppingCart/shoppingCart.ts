import { actorInTheSpotlight } from '@serenity-js/core'
import { DeleteRequest,GetRequest, LastResponse, PostRequest, PutRequest, Send } from '@serenity-js/rest'

import { actorMemories } from '../../../constants/actorMemories'
import { constants } from '../../../constants/constants'
import { endPoints } from '../../../constants/endPoints'
import { httpCodes } from '../../../constants/httpCodes'
import { CommonSuccessResponse } from '../../../dtos/common/commonSuccessResponse'
import { HitsResult } from '../../../dtos/search/searchResponse'
import { AddProductItemResponse } from '../../../dtos/shoppingCart/addProductItemResponse'
import { QuantityItemPayloadBuilder, QuantityPayloadBuilder } from '../../../dtos/shoppingCart/builders/itemQuantityPayloadBuilder'
import { ShoppingCartBuilder,ShoppingCartItemBuilder } from '../../../dtos/shoppingCart/builders/shoppingCartBuilder'
import { GetShoppingCartResponse } from '../../../dtos/shoppingCart/getShoppingCartResponse'
import { QuantityItemPayload, QuantityPayload } from '../../../dtos/shoppingCart/itemQuantityPayolad'
import { shoppingCartItemPayload,ShoppingCartPayload } from '../../../dtos/shoppingCart/shoppingCartPayload'
import { recall } from '../../../helpers/actorMemory'
import { apiAsserts } from '../../../helpers/apiAsserts'
import { callAnApi } from '../../../helpers/callApi'
import { configs } from '../../../helpers/configs'

export const shoppingCart = {
    addProductItem: async (hitItem : HitsResult[], minOrderValue: number, warehouseId: number, locationId: number, idToken: string, storeId: string, condition: string) : Promise<AddProductItemResponse>=> {
        const shoppingCartItemPayload: shoppingCartItemPayload[] = ShoppingCartItemBuilder(hitItem[0].storeReferenceId, 1, warehouseId)
        const shoppingCartPayload: ShoppingCartPayload = ShoppingCartBuilder(locationId, shoppingCartItemPayload)

        await callAnApi(
            Send.a(
                PostRequest.to(endPoints.shoppingCart.replace('{{store_id}}', storeId))
                    .with(JSON.stringify(shoppingCartPayload))
                    .using({ timeout: constants.apiDefaultTimeOut, headers: { authorization: `Bearer ${idToken}`, ...configs.apiDefaultHeaders } }),
            )
        )
        await apiAsserts.successResponse(httpCodes.OK)
        
        const addProductItemResponse: AddProductItemResponse = await actorInTheSpotlight().answer(LastResponse.body<AddProductItemResponse>())

        if (condition === constants.shoppingCartIsMajorToMinOrderValue) {
            await shoppingCart.updateQuantityItemsInCart(Math.round(hitItem[0].prices[0].managerTotal), minOrderValue, warehouseId, locationId, idToken, storeId.toString(), addProductItemResponse.carts[0].items[0].id.toString())
        }

        return addProductItemResponse
    },

    updateQuantityItemsInCart: async(managerTotal : number, minOrder: number, warehouseId: number, locationId: number, idToken: string, storeId: string, productId : string) => {
        let quantity = 1
        while ((managerTotal * quantity) <= minOrder) {
            quantity++
            const quantityItemPayload: QuantityItemPayload[] = QuantityItemPayloadBuilder(quantity, warehouseId)
            const quantityPayload: QuantityPayload = QuantityPayloadBuilder(locationId, quantityItemPayload)

            await callAnApi(
                Send.a(
                    PutRequest.to(endPoints.quantity.replace('{{store_id}}', storeId).replace('{{product_id}}', productId))
                        .with(JSON.stringify(quantityPayload))
                        .using({ timeout: constants.apiDefaultTimeOut, headers: { authorization: `Bearer ${idToken}`, ...configs.apiDefaultHeaders } }),
                )
            )

            await apiAsserts.successResponse(httpCodes.OK)
        }
    },

    getShoppingCart: async (idToken: string) : Promise<GetShoppingCartResponse> => {
        let status = 'IN_PROGRESS'
        let getShoppingCartResponse : GetShoppingCartResponse

        while(status !== constants.shoppingCartOkStatus) {
            await callAnApi(
                Send.a(
                    GetRequest.to(endPoints.getShoppingCartInfo.replace('{{store_id}}', await recall(actorMemories.storeId)))
                        .using({ timeout: constants.apiDefaultTimeOut, headers: { authorization: `Bearer ${idToken}`, ...configs.apiDefaultHeaders } })
                )
            )
            await apiAsserts.successResponse(httpCodes.OK)

            getShoppingCartResponse = await actorInTheSpotlight().answer(LastResponse.body<GetShoppingCartResponse>())
            status = getShoppingCartResponse.status
        }

        return getShoppingCartResponse

    },

    deleteShoppingCart: async(idToken: string, storeId: string) => {
        await callAnApi(
            Send.a(
                DeleteRequest.to(endPoints.deleteShoppingCart.replace('{{store_id}}', storeId))
                    .using({ timeout: constants.apiDefaultTimeOut, headers: { authorization: `Bearer ${idToken}`, ...configs.apiDefaultHeaders } })
            )
        )
        await apiAsserts.successResponse(httpCodes.OK)

        const commonSuccessResponse: CommonSuccessResponse = await actorInTheSpotlight().answer(LastResponse.body<CommonSuccessResponse>())

        return commonSuccessResponse
    }
}