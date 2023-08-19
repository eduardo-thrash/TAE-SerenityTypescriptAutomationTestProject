export interface CheckoutResponse{
    carts : Cart[]
}

export interface Cart{
    paymentMethod : PaymentMethod
    paymentDetailsCard : PaymentDetailsCard
    deliveryDetailsCard : DeliveryDetailsCard
    coupon : Coupon
    total : number
}

export interface PaymentMethod{
    id : number
    title : string
    titleCopy : string
    iconUrl : string
    merchantId : object
}

export interface PaymentDetailsCard{
    title : string
    orderTotalCopy : string
    orderTotal : number
    deliveryCostCopy : string
    deliveryCost : DeliveryCost
    couponCopy : string
    couponDiscount : number
    debitBalanceCopy : string
    amountPaidFromDebit : number
    totalPayCopy : string
    totalToPay : number 
    creditBalanceCopy : object
    amountPaidFromCredit : number
    notPay : boolean
    totalCashback : number
    usedDebitBalance : boolean
    usedCreditBalance : boolean
    availableBalance : number
    missingToPay : number
}

export interface DeliveryCost{
    value : string
    isIgnore : string
}

export interface DeliveryDetailsCard{
    deliveryAt : string
    title : string
}

export interface Coupon{
    name : object
    value : number
}

