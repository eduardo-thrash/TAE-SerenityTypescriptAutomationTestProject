/**
    @module Orders_Bussiness_rules
*/
import { Ensure, equals, isGreaterThan, isTrue, not } from '@serenity-js/assertions'
import { actorInTheSpotlight, TestCompromisedError } from '@serenity-js/core'

import { constants } from '../../../constants/constants'
import { AddressResponse } from '../../../dtos/checkout/addressResponse'
import { CheckoutResponse } from '../../../dtos/checkout/checkoutResponse'
import { NewOrderTrackingResponse } from '../../../dtos/checkout/newOrderTrackingResponse'
import { OrderCheckoutDataResponse } from '../../../dtos/checkout/OrderCheckoutDataResponse'
import { OrderTrackingResponse } from '../../../dtos/checkout/orderTrackingResponse'
import { PurchasesResponse } from '../../../dtos/purchasesResponse'

/**
 * Validate Checkout Result
 */
export const validateOrder = {
    verifyCheckoutResult: async (checkoutResponse: CheckoutResponse, paymentMethod: string) => {
        await actorInTheSpotlight().attemptsTo(
            Ensure.that(checkoutResponse.carts[0].paymentMethod.title.toLowerCase(), equals(paymentMethod.toLowerCase()))
                .otherwiseFailWith(TestCompromisedError, `It was expected that the payment method would be ${paymentMethod}, but instead, it's ${checkoutResponse.carts[0].paymentMethod.title}`),
            Ensure.that(checkoutResponse.carts[0].total, isGreaterThan(0))
                .otherwiseFailWith(TestCompromisedError, 'It was not expected that the total amount to pay would be zero')
        )
    },
    checkPurchaseResult: async (purchaseResponse: PurchasesResponse, totalToPay: number) => {
        await actorInTheSpotlight().attemptsTo(
            Ensure.that(purchaseResponse.id, not(equals(0)))
                .otherwiseFailWith(TestCompromisedError, 'It was not expected that purchase order id would be zero'),
            Ensure.that(purchaseResponse.orders[0].orderTotal, equals(totalToPay))
                .otherwiseFailWith(TestCompromisedError, `It was expected that order total value in purchase would be ${totalToPay}`),
            Ensure.that(purchaseResponse.purchaseProcessingStatus.pop().status,
                equals(constants.purchaseProcessedStatus))
                    .otherwiseFailWith(TestCompromisedError, `It was expected that last purchase processing status would be '${constants.purchaseProcessedStatus}'`)
        )
    },
    reviewOrderTrackingResult: async (orderTrackingResponse: OrderTrackingResponse, orderId: number, storeId: number) => {
        await actorInTheSpotlight().attemptsTo(
            Ensure.that(orderTrackingResponse.storeId, equals(storeId))
                .otherwiseFailWith(TestCompromisedError, `It was expected that the order tracking store id would be ${storeId}`),
            Ensure.that(orderTrackingResponse.orderId, equals(orderId))
                .otherwiseFailWith(TestCompromisedError, `It was expected that the order tracking order id would be ${orderId}`),
            Ensure.that(orderTrackingResponse.attributes.events[0].type, equals(constants.orderTrackingOrderCreated))
                .otherwiseFailWith(TestCompromisedError, `It was expected that the order tracking creation event would be '${constants.orderTrackingOrderCreated}'`),
            Ensure.that(orderTrackingResponse.state, equals(constants.orderTrackingReceivedState))
                .otherwiseFailWith(TestCompromisedError, `It was expected that the order tracking state would be '${constants.orderTrackingReceivedState}'`)
        )
    },
    validateNewOrderTrackingResult: async (newOrderTrackingResponse: NewOrderTrackingResponse, orderId: number, storeId: number) => {
        await actorInTheSpotlight().attemptsTo(
            Ensure.that(newOrderTrackingResponse.storeId, equals(storeId))
                .otherwiseFailWith(TestCompromisedError, `It was expected that the new order tracking store id would be ${storeId}`),
            Ensure.that(newOrderTrackingResponse.orderId, equals(orderId))
                .otherwiseFailWith(TestCompromisedError, `It was expected that the new order tracking order id would be ${orderId}`),
            Ensure.that(newOrderTrackingResponse.isIncompleted, equals(0))
                .otherwiseFailWith(TestCompromisedError, 'It was not expected that the new order tracking order details would be incomplete')
        )
    },
    
    validateOrderInformation: async (addressResponse: AddressResponse, orderCheckData: OrderCheckoutDataResponse, paymentMethod: string) => {
        await actorInTheSpotlight().attemptsTo(
        
            Ensure.that(addressResponse.hasAddress, isTrue())
                .otherwiseFailWith(TestCompromisedError, 'The Address field seems does not get any information'),
                
            Ensure.that(addressResponse.addressData.length, isGreaterThan(0))
                .otherwiseFailWith(TestCompromisedError, 'The Address field seems does not get any information'),
            
            Ensure.that(addressResponse.additionalInfoAddress.length, isGreaterThan(0))
                .otherwiseFailWith(TestCompromisedError, 'The Address Additional Info field seems does not get any information'),
            
            Ensure.that(addressResponse.firstName.length, isGreaterThan(0))
                .otherwiseFailWith(TestCompromisedError, 'The First Name field seems does not get any information'),
            
            Ensure.that(addressResponse.lastName.length, isGreaterThan(0))
                .otherwiseFailWith(TestCompromisedError, 'The Last Name field seems does not get any information'),
            
            Ensure.that(addressResponse.storeName.length, isGreaterThan(0))
                .otherwiseFailWith(TestCompromisedError, 'The Store Name field seems does not get any information'),
            
            Ensure.that(orderCheckData.carts[0].paymentMethod.title.toLocaleLowerCase(), equals(paymentMethod.toLocaleLowerCase()))
                .otherwiseFailWith(TestCompromisedError, 'The Store Name field seems does not get any information'),
        )
    }
}