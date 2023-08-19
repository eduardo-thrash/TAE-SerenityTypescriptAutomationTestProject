export interface OrderCheckoutDataResponse {
    carts: car[],
    total: bigint
}

interface car {
    coupon: coupon,
    deliveryDetailsCard: deliveryDetailsCard,
    paymentMethod: paymentMethod,
    paymentDetailsCard: paymentDetailsCard
}

interface coupon {
    name: string,
    value: number
}

interface deliveryDetailsCard {
    deliveryAt: string,
    title: string
}

interface paymentMethod {
    iconUrl: string,
    id: number,
    merchantId: number,
    title: string,
    titleCopy: string
}

interface paymentDetailsCard {
    amountPaidFromCredit: number,
    amountPaidFromDebit: number,
    availableBalance: number,
    couponCopy: string,
    couponDiscount: number,
    creditBalanceCopy: string,
    debitBalanceCopy: string,
    deliveryCost: deliveryCost,
    deliveryCostCopy: string,
    missingToPay: bigint,
    notPay: boolean,
    orderTotal: bigint,
    orderTotalCopy: string,
    title: string,
    totalCashback: number,
    totalPayCopy: string,
    totalToPay: bigint,
    usedCreditBalance: boolean,
    usedDebitBalance: boolean
}

interface deliveryCost {
    isIgnored: boolean,
    value: number
}
