/* eslint-disable unicorn/no-null */
import { constants } from '../../../constants/constants';
import { PurchaseCartPayload } from '../../purchasesPayload';

export const PurchasePayloadBuilder = (cart : PurchaseCartPayload[], sessionId: string, searchId: string, creditChecked : boolean, debitChecked : boolean ) => (
    {
        cart : cart, 
        orderOriginAppId : 2, 
        sessionId : sessionId, 
        couponCode : '',
        surchargesData : constants.surchargesData, 
        cartId : null, 
        creditChecked : creditChecked, 
        debitChecked : debitChecked, 
        reserveUid : null
    }
)

export const PurchaseCartPayloadBuilder = (from : string, productId: number) => (
    [
        {
            from: from,
            id: productId,
            merchantId: null
        }
    ]
)