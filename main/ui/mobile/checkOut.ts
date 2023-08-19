import { by, Target } from '@serenity-js/webdriverio';

import { elementConstant } from '../../constants/elementConstants';
import { targetLabel } from '../../constants/targetLabels';

export const checkOutUi = {
    backButtonToDashboard: () =>
        Target.the('back button to dashboard screen').located(by.xpath('//*[@content-desc="undefined"]')),

    searchSelectFirstResultProduct: () =>
        Target.the('First product found after search it').located(by.xpath('(//*[@content-desc="catalogExternalCard"])[2]')),

    //@xpath
    cartItemFinalPrice: () =>
        Target.the('item final price below product description in shopping cart').located(by.xpath('//*[@resource-id = "cartItemPrice"]//android.widget.TextView[2]')),
    
    //@xpath
    cartEmptyOption: () =>
        Target.the('option to empty all the products in cart').located(by.xpath('(//android.widget.ScrollView//android.view.ViewGroup[3]//android.widget.TextView)[3]')),

    //@xpath
    cartConfirmEmptyButton: () => 
        Target.the('button to confirm empty all the products in cart').located(by.xpath('//*[@text = "Si, eliminar"]')),

    //@xpath
    cartIsEmptyLabel: () =>
        Target.the('cart is empty label text confirmation').located(by.xpath('(//*[@content-desc="checkoutCartScreenSearchHeader"]//android.widget.TextView)[2]')),

    //@xpath
    cartTabBarQuantityInCart: () =>
        Target.the('quantity value above the cart tab bar icon').located(by.xpath('//*[@content-desc="tabBarButtonCartStack"]//android.widget.TextView')),

    cartItemQuantityInput: () =>
        Target.the('quantity item on input between increase and decrease buttons').located(by.xpath('//*[@content-desc="cartItemQuantityInput"]')),

    checkoutFinishOrderButton: () =>
        Target.the('checkout button to purchase the order').located(by.xpath(`//*[@content-desc="${elementConstant.checkoutPurchaseOrderButton}"]`)),
    //@xpath
    checkoutHeaderTitle: (label: string) =>
        Target.the(label).located(by.xpath('//*[@content-desc="undefined"]/following-sibling::android.widget.TextView')),

    //@xpath
    checkoutInfoText: (label: string, text: string, index: number) =>
        Target.the(label).located(by.xpath(`//*[contains(@text, "${text}")]/following-sibling::android.widget.TextView[${index}]`)),

    //@xpath
    checkoutSendOptionsInfoCard: (label: string, index: number) =>
        Target.the(label).located(by.xpath(`//*[contains(@text, 'Opciones de envío')]/following-sibling::android.view.ViewGroup[1]/android.widget.TextView[${index}]`)),

    //@xpath
    checkoutUnitPrice: () =>
        Target.the('Unit price of selected product').located(by.xpath("(//*[@index='4'])[2]")),

    //@xpath
    checkoutViewImageProduct: () =>
        Target.the('Image of the selected product').located(by.xpath("(//*[@index='0'])[41]")),

    checkoutProductQuantity: () =>
        Target.the('Product quantity text').located(by.xpath('//*[@resource-id="cantDetailProduct"]')),

    //@xpath
    checkoutAddToCart: () =>
        Target.the('Add to car button').located(by.xpath('//*[starts-with(@text,"Agregar")]')),

    //@xpath
    checkoutGoToCartButton: () =>
        Target.the('Cart button').located(by.xpath('//*[@content-desc="tabBarButtonCartStack"]')),
    
    //@xpath
    checkoutMiniTrackingCardOrderIdText: () =>
        Target.the('checkout mini tracking card order id text').located(by.xpath('(//*[@content-desc="catalogDashboard"]//android.widget.TextView)[1]')),

    //@xpath    
    checkoutReduceQuantity: () =>
        Target.the('Decrease the quantity of product on internal card').located(by.xpath("(//*[@index='0'])[50]")),

    //@xpath
    checkoutIncreaseQuantity: () =>
        Target.the('Increase the quantity of product on internal card').located(by.xpath("(//*[@index='0'])[53]")),

    //@xpath
    checkoutCartTitle: () =>
        Target.the('Cart page when order can´t be completed because the minimum value is not enough').located(by.xpath("(//*[@index='0'])[41]")),

    checkoutValidateMinimunAmountBar: () =>
        Target.the('Minimun amount Bar in shopping cart page ').located(by.xpath('//*[@content-desc="checkoutCartScreenMinimumOrderDropdown"]')),

    checkoutCartIncreaseQuantity: () =>
        Target.the('Increase the quantity of product on cart page').located(by.xpath('//*[@content-desc="cartItemQuantityIncrement"]')),

    checkoutCartReduceQuantity: () =>
        Target.the('Reduce the quantity of product on cart page').located(by.xpath('//*[@content-desc="cartItemQuantityDecrease"]')),

    //@xpath
    checkoutCartTotalBalance: () =>
        Target.the('Total Balance of product on cart page').located(by.xpath("(//*[@index='3'])[4]")),

    //@xpath
    checkoutCartContinueButtonText: () =>
        Target.the('Text on the continue button').located(by.xpath('(//*[@content-desc="checkoutCartScreenButtonContinue"]//android.widget.TextView)[2]')),

    //@xpath
    checkoutCartEmptyProducts: () =>
        Target.the('Empty cart option').located(by.xpath("(//*[@index='0'])[70]")),

    //@xpath
    checkoutCartConfirmEmptyProducts: () =>
        Target.the('confirm empty cart option').located(by.xpath("(//*[@index='0'])[88]")),

    checkoutCartContinueButton: () =>
        Target.the('Continue button on cart page').located(by.xpath('//*[@content-desc="checkoutCartScreenButtonContinue"]')),

    //@xpath
    checkoutCartSuggestionsContinueButton: () =>
        Target.the('Continue button on suggestions page after cart page').located(by.xpath('(//*[@content-desc="checkoutCartScreenButtonContinue"])[1]')),

    //@xpath
    checkoutCartDeleteProduct: () =>
        Target.the('Option to delete the producto from cart page').located(by.xpath("(//*[@index='0'])[50]")),

    //@xpath
    checkoutCartSuggestionsTitle: () =>
        Target.the('Tittle in the suggestions continue view').located(by.xpath('//*[starts-with(@text,"Te faltaron")]')),

    //@xpath
    orderSummaryButton: (label : string, text : string) =>
        Target.the(label).located(by.xpath(`//*[contains(@text, "${text}")]`)),

    //@xpath
    orderSummaryCancellationReason: (reason : string) =>
        Target.the(`${reason} reason option to cancel order`).located(by.xpath(`//*[contains(@text, "${reason}")]`)),
    
    //@xpath
    orderCancellationQuestionReason: () =>
        Target.the('order cancellation question reason title').located(by.xpath('//android.widget.ScrollView//android.widget.TextView[1]')),

    //@xpath
    orderCancellationButton: () =>
        Target.the('button to perform order cancellation').located(by.xpath('(//android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup)[2]')),
    
    //@xpath
    confirmOrderCancellationButton: () =>
        Target.the('confirmation button to ensure order cancellation process').located(by.xpath('(//*[@text="Cancelar pedido"])[3]')),
    
    //@xpath
    cancellationDetailsReOrderButton: () =>
        Target.the('button to re-order in cancellation details screen').located(by.xpath('//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[1]')),
    
    //@xpath
    cancellationDetailsStatus: () =>
        Target.the('cancellation details status').located(by.xpath('//*[contains(@text, "Cancelado")]')),
    
    //@xpath
    cancellationDetailsTotalToPay: () =>
        Target.the('cancellation details total to pay').located(by.xpath('//*[contains(@text, "Valor a pagar")]/following-sibling::android.widget.TextView[1]')),

    //@xpath
    cancellationDetailsHelpButton: () =>
        Target.the('support help button in cancellation details screen').located(by.xpath('//*[contains(@text, "ayuda")]')),

    //@xpath
    orderSummaryInfoText: (label: string, text: string, index: number) =>
        Target.the(label).located(by.xpath(`//*[contains(@text, "${text}")]/following-sibling::android.widget.TextView[${index}]`)),

    //@xpath
    orderSummaryConfirmedStatus: () =>
        Target.the(targetLabel.orderSummaryStatusConfirmedLabel).located(by.xpath('(//android.widget.ScrollView//android.widget.TextView)[1]')),

    //@xpath
    timeWindowContinueButton: () =>
        Target.the('time window continue button to checkout screen').located(by.xpath('(//android.widget.FrameLayout//android.view.ViewGroup[2]/android.view.ViewGroup)[2]')),

    //@xpath
    timeWindowDelivery: () =>
        Target.the('checkout delivery time window space').located(by.xpath('(//android.widget.ScrollView//android.view.ViewGroup[2]//android.widget.TextView)[1]')),

    //@xpath
    timeWindowSuggestedDate: () =>
        Target.the('checkout time window suggested date').located(by.xpath('(//android.widget.ScrollView//android.view.ViewGroup[1]//android.widget.TextView)[1]'))
}