import { Ensure, equals } from '@serenity-js/assertions'
import { actorInTheSpotlight, TestCompromisedError } from '@serenity-js/core'
import { GetRequest, LastResponse, PostRequest, Send } from '@serenity-js/rest'

import { actorMemories } from '../../../constants/actorMemories'
import { constants } from '../../../constants/constants'
import { endPoints } from '../../../constants/endPoints'
import { httpCodes } from '../../../constants/httpCodes'
import { AddItemsPayload,ItemPayload } from '../../../dtos/checkout/AddItemsPayload'
import { AddItemsResponse } from '../../../dtos/checkout/AddItemsResponse'
import { AddressResponse } from '../../../dtos/checkout/addressResponse'
import { AddItemsBuilder,ItemPayloadBuilder } from '../../../dtos/checkout/builders/AddItemsBuilders'
import { CheckoutPayloadBuilder } from '../../../dtos/checkout/builders/checkoutPayloadBuilder'
import { CheckoutPayload } from '../../../dtos/checkout/checkoutPayload'
import { CheckoutResponse } from '../../../dtos/checkout/checkoutResponse'
import { CheckShoppingCarResponse } from '../../../dtos/checkout/checkShoppingCarStatusResponse'
import { GetShoppingCarDetailsResponse } from '../../../dtos/checkout/getShoppingCartResponse'
import { NewOrderTrackingResponse } from '../../../dtos/checkout/newOrderTrackingResponse'
import { OrderTrackingResponse } from '../../../dtos/checkout/orderTrackingResponse'
import { HitsResult } from '../../../dtos/search/searchResponse'
import { recall, remember } from '../../../helpers/actorMemory'
import { apiAsserts } from '../../../helpers/apiAsserts'
import { callAnApi } from '../../../helpers/callApi'
import { configs } from '../../../helpers/configs'
import { finishTest } from '../../../helpers/finishTest'

export const checkout = {

    addProductsToShoppingCar: async (idToken: string, storeId: number, productsToAdd: HitsResult[], locationId: number): Promise<AddItemsResponse> => {
        
        const itemsPayload: ItemPayload[] = productsToAdd.map((item)=>
            ItemPayloadBuilder(item.id, item.merchantId, 1, item.warehouseId, 'PRODUCT')
        )
        
        const addItemsPayload: AddItemsPayload = AddItemsBuilder(locationId,itemsPayload)

        await callAnApi(
            Send.a(
                PostRequest.to(endPoints.addItemsToShoppingCar.replace('{{store_id}}', storeId.toString()))
                    .with(JSON.stringify(addItemsPayload))
                    .using({ timeout: constants.apiDefaultTimeOut, headers: { Authorization: `Bearer ${idToken}`, ...configs.apiDefaultHeaders } }),
            )
        )
        
        return await actorInTheSpotlight().answer(LastResponse.body<AddItemsResponse>())
    },
    
    checkShoppingCarStatus: async (storeId: number): Promise<CheckShoppingCarResponse> => {
        await callAnApi(
            Send.a(
                GetRequest.to(endPoints.checkShoppingCarStatus.replace('{{store_id}}',storeId.toString()))
                .using({timeout : constants.apiDefaultTimeOut, headers : configs.apiDefaultHeaders})
            )
        )
        
        return await actorInTheSpotlight().answer(LastResponse.body<CheckShoppingCarResponse>())
    },
    
    getCarInfo: async (idToken: string, storeId: number): Promise<GetShoppingCarDetailsResponse> => {
        await callAnApi(
            Send.a(
                GetRequest.to(endPoints.getShoppingCarDetails.replace('{{store_id}}',storeId.toString()))
                .using({timeout : constants.apiDefaultTimeOut, headers: { Authorization: `Bearer ${idToken}`, ...configs.apiDefaultHeaders }})
            )
        )
        
        return await actorInTheSpotlight().answer(LastResponse.body<GetShoppingCarDetailsResponse>())
    },
    
    to: async () => {
        const checkoutPayload: CheckoutPayload = { couponCode: 'null', debitChecked: true }

        const elapseTime = await callAnApi(
            Send.a(
                PostRequest.to(endPoints.checkout.replace('{{store_id}}', await recall(actorMemories.storeId)))
                    .with(JSON.stringify(checkoutPayload))
                    .using({ timeout: constants.apiDefaultTimeOut, headers: configs.apiDefaultHeaders })
            )
        )

        Ensure.that(LastResponse.status(), equals(httpCodes.OK)).otherwiseFailWith(TestCompromisedError, 'The cart has no products added')

        const response: CheckoutResponse = await actorInTheSpotlight().answer(LastResponse.body<CheckoutResponse>())

        await remember(actorMemories.checkoutResponse, response)
        await remember(actorMemories.timeResponse, elapseTime)

        return finishTest()
    },
    getOrderCheckOutData: async (idToken: string, storeId: string): Promise<CheckoutResponse> => {
        const checkoutPayload: CheckoutPayload = CheckoutPayloadBuilder()

        await callAnApi(
            Send.a(
                PostRequest.to(endPoints.orderCheckoutData.replace('{{store_id}}', storeId))
                    .with(JSON.stringify(checkoutPayload))
                    .using({ timeout: constants.apiDefaultTimeOut, headers: { authorization: `Bearer ${idToken}`, ...configs.apiDefaultHeaders } })
            )
        )

        await apiAsserts.successResponse(httpCodes.OK)

        const checkoutResponse: CheckoutResponse = await actorInTheSpotlight().answer(LastResponse.body<CheckoutResponse>())

        return checkoutResponse
    },
    
    getOrderTrackingInfo: async (idToken: string, storeId: string, orderId: string) : Promise<OrderTrackingResponse> => {
        await callAnApi(
            Send.a(
                GetRequest.to(endPoints.orderTracking.replace('{{store_id}}', storeId).replace('{{order_id}}', orderId))
                    .using({ timeout: constants.apiDefaultTimeOut, headers: { authorization: `Bearer ${idToken}`, ...configs.apiDefaultHeaders } })
            )
        )

        await apiAsserts.successResponse(httpCodes.OK)

        const orderTrackingResponse : OrderTrackingResponse = await actorInTheSpotlight().answer(LastResponse.body<OrderTrackingResponse>())

        return orderTrackingResponse
    },
    getNewOrderTracking: async (idToken: string, orderId: string) : Promise<NewOrderTrackingResponse[]> => {
        await callAnApi(
            Send.a(
                GetRequest.to(endPoints.newOrderTracking.replace('{{order_id}}', orderId))
                    .using({ timeout: constants.apiDefaultTimeOut, headers: { authorization: `Bearer ${idToken}`, ...configs.apiDefaultHeaders } })
            )
        )

        await apiAsserts.successResponse(httpCodes.OK)

        const newOrderTrackingResponse : NewOrderTrackingResponse[] = await actorInTheSpotlight().answer(LastResponse.body<NewOrderTrackingResponse[]>())

        return newOrderTrackingResponse
    },
    
    getAddressInfo: async (storeId: number, idToken: string): Promise<AddressResponse> => {
        await callAnApi(
            Send.a(
                GetRequest.to(endPoints.addressData.replace('{{store_id}}',storeId.toString()))
                    .using({ timeout: constants.apiDefaultTimeOut, headers: { authorization: `Bearer ${idToken}`, ...configs.apiDefaultHeaders } })
            )
        )

        await apiAsserts.successResponse(httpCodes.OK)
        
        return await actorInTheSpotlight().answer(LastResponse.body<AddressResponse>())
    }
}