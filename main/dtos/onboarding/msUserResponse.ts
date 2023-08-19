import { storeMsUserPayload } from './storeMsUserPayload'

export interface MsUserResponse{
    id : number,
    uid : string,
    roleId : number,
    firstName : string,
    lastName : string,
    email : string,
    document : object,
    phone : string,
    address : object,
    codePhone : string,
    imageUrl : object,
    deletedAt : object,
    store : storeMsUserPayload,
    hasAddress : boolean,
    countryId : number,
    country : string,
    countryName : string,
    cityName : string,
    isFirstTime : boolean,
    billingInfo : MsUserBillingInfoResponse
    thereIsOrderInTransit : boolean,
    isAdult : object,
    coverage : Array<any>
    unsubscribed : boolean
}

export interface MsUserBillingInfoResponse {
    hasBillingInfo: boolean
}