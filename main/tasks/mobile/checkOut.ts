import { Ensure, equals, not, or, startsWith } from '@serenity-js/assertions';
import { actorInTheSpotlight, Check, Duration, Log, Task, TestCompromisedError } from '@serenity-js/core'
import { isVisible, Wait } from '@serenity-js/webdriverio';

import { actorMemories } from '../../constants/actorMemories';
import { constants } from '../../constants/constants';
import { elementConstant } from '../../constants/elementConstants';
import { keycodes } from '../../constants/keycodes';
import { targetLabel } from '../../constants/targetLabels';
import { getOrderConfirmed } from '../../db/access/orderStore';
import { NumbersByCountry } from '../../dtos/onboarding/country';
import { click, enterValue, scrollToPosition } from '../../helpers/actions';
import { recall, remember } from '../../helpers/actorMemory';
import { countryReason } from '../../helpers/cancellationReasons';
import { countryData } from '../../helpers/country';
import { resolve } from '../../helpers/element';
import { getTextByElement } from '../../helpers/text';
import { catalogUI } from '../../ui/mobile/catalog';
import { checkOutUi } from '../../ui/mobile/checkOut';

export const checkOut = {
    addProduct: async () =>
        await actorInTheSpotlight().attemptsTo(
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
                .until(checkOutUi.searchSelectFirstResultProduct(), isVisible()),

            Ensure.that(checkOutUi.searchSelectFirstResultProduct(), isVisible()).
                otherwiseFailWith(TestCompromisedError, 'The first product found is not visible'),
            await click(checkOutUi.searchSelectFirstResultProduct())
        ),
    checkElements: async () =>
        await actorInTheSpotlight().attemptsTo(
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
                .until(checkOutUi.checkoutViewImageProduct(), isVisible()),
            Ensure.that(checkOutUi.checkoutViewImageProduct(), isVisible()).
                otherwiseFailWith(TestCompromisedError, 'The product image is not visible'),
            Ensure.that(checkOutUi.checkoutUnitPrice(), isVisible()).
                otherwiseFailWith(TestCompromisedError, 'The unit price of product is not visible'),
            Ensure.that(checkOutUi.checkoutProductQuantity(), isVisible()).
                otherwiseFailWith(TestCompromisedError, 'The product quantity text is not visible'),
            Ensure.that(checkOutUi.checkoutAddToCart(), isVisible()).
                otherwiseFailWith(TestCompromisedError, 'The add to cart button is not visible'),
            await click(checkOutUi.checkoutAddToCart()),
            Ensure.that(checkOutUi.checkoutGoToCartButton(), isVisible()).
                otherwiseFailWith(TestCompromisedError, 'The shopping cart button is not visible'),
            Wait.for(Duration.ofSeconds(2)),
            await click(checkOutUi.checkoutGoToCartButton()),

        ),

    validateMinimunOrder: async () =>
        await actorInTheSpotlight().attemptsTo(
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
                .until(checkOutUi.checkoutCartTitle(), isVisible()),
            Ensure.that(checkOutUi.checkoutCartTitle(), isVisible()).
                otherwiseFailWith(TestCompromisedError, 'The Cart title image is not visible'),
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
                .until(checkOutUi.checkoutCartIncreaseQuantity(), isVisible()),
            Ensure.that(checkOutUi.checkoutCartIncreaseQuantity(), isVisible()).
                otherwiseFailWith(TestCompromisedError, 'The Increase product option is not visible'),
            Ensure.that(checkOutUi.checkoutCartTotalBalance(), isVisible()).
                otherwiseFailWith(TestCompromisedError, 'The total balance text is not visible'),
            Ensure.that(checkOutUi.checkoutCartContinueButton(), isVisible()).
                otherwiseFailWith(TestCompromisedError, 'The continue cart button is not visible'),

        ),

    checkButtonStatus: async (condition: string) => {
        await remember(actorMemories.minimunOrderCondition, condition)
        let continueButtonValue: string = await getTextByElement(checkOutUi.checkoutCartContinueButtonText())
        continueButtonValue = continueButtonValue.replace(/[\s$.]/g, '')

        let totalBalanceValue: string = await getTextByElement(checkOutUi.checkoutCartTotalBalance())
        totalBalanceValue = totalBalanceValue.replace(/[\s$.]/g, '')
        const countryInfo: NumbersByCountry = countryData(await recall(actorMemories.country))

        await actorInTheSpotlight().attemptsTo(
            Ensure.that(totalBalanceValue, equals(continueButtonValue))
                .otherwiseFailWith(TestCompromisedError, 'The total amount is not according to continue button value'),
        )
        if (condition === 'major') {
            while (Number.parseInt(totalBalanceValue) <= countryInfo.minimunOrderValue) {
                await actorInTheSpotlight().attemptsTo(await click(checkOutUi.checkoutCartIncreaseQuantity()), Wait.for(Duration.ofSeconds(3)))
                totalBalanceValue = await getTextByElement(checkOutUi.checkoutCartTotalBalance())
                totalBalanceValue = totalBalanceValue.replace(/[\s$.]/g, '')

            }
        }

        await remember(actorMemories.currentTotalBalanceValue, totalBalanceValue)

        return Task.where('#actor continues to checkout screen',
            await click(checkOutUi.checkoutCartContinueButton())
        )
    },
    editItemsQuantityTextFieldInCard: async() => {
        const randomIncrease = Math.floor(Math.random() * 5) + 1

        await actorInTheSpotlight().attemptsTo(
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
                        .until(catalogUI.catalogInternalCardEditText(), isVisible()),
            await click(catalogUI.catalogInternalCardEditText()),
        )

        const initialQuantity = await getTextByElement(catalogUI.catalogInternalCardEditText())
        const editText = await catalogUI.catalogInternalCardEditText().answeredBy(actorInTheSpotlight())
                
        for(let index = 0; index < initialQuantity.length; index++){
            await editText.pressKeyCode(keycodes.BACKSPACE)
        }
       
        await actorInTheSpotlight().attemptsTo(
            Wait.for(Duration.ofSeconds(1)),
            await enterValue(catalogUI.catalogInternalCardEditText(), Number.parseInt(initialQuantity) * randomIncrease),
            
            Check.whether(catalogUI.catalogDiscountExcedeedAlert(), isVisible())
                .andIfSo(
                    await click(catalogUI.catalogDiscountExcedeedDismissButtonAlert())
                ).otherwise(
                    await click(catalogUI.catalogInternalProductImage())
                )
        )
                
        await remember(actorMemories.randomIncrease, randomIncrease)
        await remember(actorMemories.initialQuantity, initialQuantity)
        
    },
    verifyUpdatedTextFieldQuantity: async() => {
        const randomIncrease = await recall(actorMemories.randomIncrease)
        const initialQuantity = await recall(actorMemories.initialQuantity)

        const currentQuantity = await getTextByElement(catalogUI.catalogInternalCardEditText())
        await actorInTheSpotlight().attemptsTo(
            Ensure.that(Number.parseInt(currentQuantity), equals(Number.parseInt(initialQuantity) * randomIncrease))
                        .otherwiseFailWith(TestCompromisedError, `${catalogUI.catalogInternalCardEditText()} was expected to be equal ${Number.parseInt(initialQuantity) * randomIncrease}`)
        )
    },
    modifyQuantityInCart: async (item: string) => {
        if (item === 'increase') {
            const randomIncrease = Math.floor(Math.random() * 5) + 1

            let cartItemPrice = await getTextByElement(checkOutUi.cartItemFinalPrice())
            cartItemPrice = cartItemPrice.replace(/[\s.]/g, '')

            const cartItemQuantityInput = await getTextByElement(checkOutUi.cartItemQuantityInput())

            const unitPrice = Number.parseInt(cartItemPrice) / Number.parseInt(cartItemQuantityInput)

            await remember(actorMemories.shoppingCartUnitPrice, unitPrice)
            await checkOut.performChange(item, randomIncrease)

            await remember(actorMemories.randomIncrease, randomIncrease)

            let totalBalanceValue: string = await getTextByElement(checkOutUi.checkoutCartTotalBalance())
            totalBalanceValue = totalBalanceValue.replace(/[\s$.]/g, '')

            await remember(actorMemories.shoppingCartTotalInc, totalBalanceValue)

            const quantityIncreased = await getTextByElement(checkOutUi.cartItemQuantityInput())
            await remember(actorMemories.quantityIncreased, quantityIncreased)

            Wait.for(Duration.ofSeconds(3))
        } else {
            const randomDecrease = Math.floor(Math.random() * await recall(actorMemories.randomIncrease)) + 1

            await checkOut.performChange(item, randomDecrease)

            let totalBalanceValue: string = await getTextByElement(checkOutUi.checkoutCartTotalBalance())
            totalBalanceValue = totalBalanceValue.replace(/[\s$.]/g, '')

            await remember(actorMemories.shoppingCartTotalDec, totalBalanceValue)

            const quantityDecreased = await getTextByElement(checkOutUi.cartItemQuantityInput())
            await remember(actorMemories.quantityDecreased, quantityDecreased)

            Wait.for(Duration.ofSeconds(3))
        }
    },

    performChange: async (item: string, quantity: number) => {
        const changeTypeElementId = item === 'increase' ? checkOutUi.checkoutCartIncreaseQuantity() : checkOutUi.checkoutCartReduceQuantity()

        await actorInTheSpotlight().attemptsTo(
            Task.where(`#actor ${item} ${quantity} items in shopping cart`,
                Log.the(`${item} ${quantity} items to product`))
        )

        for (let index = 0; index < quantity; index++) {
            await actorInTheSpotlight().attemptsTo(await click(changeTypeElementId), Wait.for(Duration.ofSeconds(3)))
        }
    },
    verifyUpdatedBalances: async () => {
        const productUnitPrice = Number.parseInt(await recall(actorMemories.shoppingCartUnitPrice))
        const quantityIncreased = Number.parseInt(await recall(actorMemories.quantityIncreased))
        const quantityDecreased = Number.parseInt(await recall(actorMemories.quantityDecreased))
        const totalBalanceIncreased = Number.parseInt(await recall(actorMemories.shoppingCartTotalInc))
        const totalBalanceDecreased = Number.parseInt(await recall(actorMemories.shoppingCartTotalDec))

        let totalBalanceValue: string = await getTextByElement(checkOutUi.checkoutCartTotalBalance())
        totalBalanceValue = totalBalanceValue.replace(/[\s$.]/g, '')

        let continueButtonValue: string = await getTextByElement(checkOutUi.checkoutCartContinueButtonText())
        continueButtonValue = continueButtonValue.replace(/[\s$.]/g, '')

        return Task.where('#actor verify the total balance values are succesfully updated',
            Ensure.that((quantityIncreased * productUnitPrice), equals(totalBalanceIncreased))
                .otherwiseFailWith(TestCompromisedError, `The calculation of subtotal amout from incremented items quantities in product: productUnitPrice = ${productUnitPrice} * quantityIncreased = ${quantityIncreased} : ${quantityIncreased * productUnitPrice} is not equal to subtotal amount reported from shopping cart: ${totalBalanceIncreased}`),
            Ensure.that((quantityDecreased * productUnitPrice), equals(totalBalanceDecreased))
                .otherwiseFailWith(TestCompromisedError, `The calculation of subtotal amout from decremented items quantities in product: productUnitPrice = ${productUnitPrice} * quantityDecreased = ${quantityDecreased} : ${quantityDecreased * productUnitPrice} is not equal to subtotal amount reported from shopping cart: ${totalBalanceDecreased}`),
            Ensure.that(totalBalanceValue, equals(continueButtonValue))
                .otherwiseFailWith(TestCompromisedError, `The subtotal amount in shopping cart: ${totalBalanceValue} is not equal to subtotal amount in continue button: ${continueButtonValue}`),
        )
    },

    checkSuggestions: async (condition: string) => {
        const oldCondition = await recall(actorMemories.minimunOrderCondition)
        await actorInTheSpotlight().attemptsTo(
            Check.whether(oldCondition, equals(condition))
                .andIfSo(
                    Ensure.that(checkOutUi.checkoutCartSuggestionsContinueButton(), isVisible())
                ).otherwise(
                    Ensure.that(checkOutUi.checkoutCartSuggestionsContinueButton(), not(isVisible()))
                )

        )
    },

    clickSuggestions: async (confirmCreation: string) => {
        await actorInTheSpotlight().attemptsTo(

            Check.whether(confirmCreation, equals('can be'))
                .andIfSo(
                    Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
                        .until(checkOutUi.checkoutCartSuggestionsTitle(), isVisible()),
                    Ensure.that(await getTextByElement(checkOutUi.checkoutCartSuggestionsTitle()), startsWith('Te'))
                        .otherwiseFailWith(TestCompromisedError, 'The suggestions modal to confirm the cart products is not visible'),

                    await click(checkOutUi.checkoutCartSuggestionsContinueButton())

                ).otherwise(
                    Ensure.that(checkOutUi.checkoutCartTitle(), isVisible())
                        .otherwiseFailWith(TestCompromisedError, 'The cart page to modify products is not visible')
                )

        )

    },
    confirmCheckoutDetails: async (paymentMethod: string) => {
        await actorInTheSpotlight().attemptsTo(
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
                .until(checkOutUi.checkoutHeaderTitle(targetLabel.timeWindowHeaderTitleLabel), isVisible())
        )
        const currentScreenHeaderTitle = await getTextByElement(checkOutUi.checkoutHeaderTitle(targetLabel.timeWindowHeaderTitleLabel))
        if (currentScreenHeaderTitle.startsWith('Programa')) {
            await actorInTheSpotlight().attemptsTo(
                Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
                    .until(checkOutUi.timeWindowDelivery(), isVisible()),

                Ensure.that(await getTextByElement(checkOutUi.timeWindowSuggestedDate()), not(or(equals(''), equals('undefined'))))
                    .otherwiseFailWith(TestCompromisedError, `${checkOutUi.timeWindowSuggestedDate()} was expected to not be empty or undefined`),

                Ensure.that(await getTextByElement(checkOutUi.timeWindowDelivery()), not(or(equals(''), equals('undefined'))))
                    .otherwiseFailWith(TestCompromisedError, `${checkOutUi.timeWindowDelivery()} was expected to not be empty or undefined`),

                await click(checkOutUi.timeWindowDelivery()),

                Ensure.that(checkOutUi.timeWindowContinueButton(), isVisible())
                    .otherwiseFailWith(TestCompromisedError, `${checkOutUi.timeWindowContinueButton()} was expected to be visible`),

                await click(checkOutUi.timeWindowContinueButton()),
            )
            await checkOut.with(paymentMethod, 'timewindow')
        } else {
            await checkOut.with(paymentMethod, 'checkout')
        }

    },
    with: async (paymentMethod: string, originFlow: string) => {
        const size = await driver.getWindowSize()
        const cartTotalValue = await recall(actorMemories.currentTotalBalanceValue)

        await actorInTheSpotlight().attemptsTo(
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
                .until(checkOutUi.checkoutSendOptionsInfoCard(targetLabel.sendOptionsSuggestedDeliveryDateLabel, 2), isVisible()),

            Ensure.that(await getTextByElement(checkOutUi.checkoutHeaderTitle(targetLabel.checkoutHeaderTitleLabel)), not(or(equals(''), equals('undefined'))))
                .otherwiseFailWith(TestCompromisedError, `the ${targetLabel.checkoutHeaderTitleLabel} was expected to not be empty or undefined`),

            Ensure.that(await getTextByElement(checkOutUi.checkoutSendOptionsInfoCard(targetLabel.sendOptionsSuggestedDeliveryDateLabel, 2)), not(or(equals(''), equals('undefined'))))
                .otherwiseFailWith(TestCompromisedError, `the ${targetLabel.sendOptionsSuggestedDeliveryDateLabel} was expected to not be empty or undefined`),

            Check.whether(originFlow, equals('timewindow'))
                .andIfSo(
                    Ensure.that(await getTextByElement(checkOutUi.checkoutSendOptionsInfoCard(targetLabel.sendOptionsTimeWindowLabel, 4)), not(or(equals(''), equals('undefined'))))
                        .otherwiseFailWith(TestCompromisedError, `the ${targetLabel.sendOptionsTimeWindowLabel} was expected to not be empty or undefined`)
                ).otherwise(
                    Ensure.that(await getTextByElement(checkOutUi.checkoutSendOptionsInfoCard(targetLabel.sendOptionsTimeWindowLabel, 3)), not(or(equals(''), equals('undefined'))))
                        .otherwiseFailWith(TestCompromisedError, `the ${targetLabel.sendOptionsTimeWindowLabel} was expected to not be empty or undefined`),

                    Ensure.that(await getTextByElement(checkOutUi.checkoutInfoText(targetLabel.checkoutDeliveryAddressLabel, elementConstant.checkoutDeliveryAddressText, 1)), not(or(equals(''), equals('undefined'))))
                        .otherwiseFailWith(TestCompromisedError, `the ${targetLabel.checkoutDeliveryAddressLabel} was expected to not be empty or undefined`)
                )
                
        )
        await remember(actorMemories.checkoutDeliveryAddress, await getTextByElement(checkOutUi.checkoutInfoText(targetLabel.checkoutDeliveryAddressLabel, elementConstant.checkoutDeliveryAddressText, 1)))
        const suggestedDate = await getTextByElement(checkOutUi.checkoutSendOptionsInfoCard(targetLabel.sendOptionsSuggestedDeliveryDateLabel, 2))
        await remember(actorMemories.checkoutSuggestedDate, suggestedDate.trim())
        const indicationsSection = await resolve(checkOutUi.checkoutInfoText(targetLabel.checkoutDeliveryIndicationsLabel, elementConstant.checkoutDeliveryIndicationsText, 1))
        await scrollToPosition(indicationsSection, 0, size.height, 'bottom')

        let totalToPay = await getTextByElement(checkOutUi.checkoutInfoText(targetLabel.checkoutOrderTotalValueLabel, elementConstant.checkoutOrderValueTotalText, 2))
        totalToPay = totalToPay.replace(constants.moneyRegexp, '')

        const billingInfo = await getTextByElement(checkOutUi.checkoutInfoText(targetLabel.checkoutBillingInfoLabel, elementConstant.checkoutBillingInfoText, 1))

        const nameIndex = billingInfo.lastIndexOf(',')
        const billingName = billingInfo.slice(0, Math.max(0, nameIndex)).trim()

        const billingDocument = ((billingInfo.slice(Math.max(0, nameIndex + 1))).split(':')[1]).trim();

        await actorInTheSpotlight().attemptsTo(
            Task.where(`#actor confirms the checkout info with payment method: ${paymentMethod}`,
                Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
                    .until(checkOutUi.checkoutInfoText(targetLabel.checkoutPaymentMethodLabel, elementConstant.checkoutPaymentMethodText, 1), isVisible()),

                Ensure.that(checkOutUi.checkoutInfoText(targetLabel.checkoutDeliveryIndicationsLabel, elementConstant.checkoutDeliveryIndicationsText, 1), isVisible())
                    .otherwiseFailWith(TestCompromisedError, `the ${targetLabel.checkoutDeliveryIndicationsLabel} was expected to be visible`),

                Ensure.that(totalToPay, equals(cartTotalValue))
                    .otherwiseFailWith(TestCompromisedError, `the ${targetLabel.checkoutOrderTotalValueLabel}: ${totalToPay} was expected to be equal the total value from shopping cart: ${cartTotalValue}`),

                Ensure.that(await getTextByElement(checkOutUi.checkoutInfoText(targetLabel.checkoutPaymentMethodLabel, elementConstant.checkoutPaymentMethodText, 1)), equals(paymentMethod))
                    .otherwiseFailWith(TestCompromisedError, `the ${targetLabel.checkoutPaymentMethodLabel} was expected to be equal ${paymentMethod}`),

                Ensure.that(billingName, not(or(equals(''), equals('undefined'))))
                    .otherwiseFailWith(TestCompromisedError, 'The billing client name was expected to not be empty or undefined'),

                Ensure.that(billingDocument, not(or(equals(''), equals('undefined'))))
                    .otherwiseFailWith(TestCompromisedError, 'The billing client document number was expected to not be empty or undefined')
            )
        )
        await remember(actorMemories.checkoutOrderTotalValue, Number.parseInt(totalToPay))
        await remember(actorMemories.checkoutPaymentMethod, paymentMethod)

        await actorInTheSpotlight().attemptsTo(
            await click(checkOutUi.checkoutFinishOrderButton()),
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
                .until(checkOutUi.orderSummaryConfirmedStatus(), isVisible())
        )

    },
    waitForOrderDetails: async () => {
        try {
            await actorInTheSpotlight().attemptsTo(
                Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
                    .until(checkOutUi.orderSummaryConfirmedStatus(), isVisible()),
            )
            await checkOut.checkOrderDetails()
        } catch (error) {
            await actorInTheSpotlight().attemptsTo(
                Log.the('It tooks more than 15 seconds to validate the order confirmation screen after it was created. Now, trying from mini-tracking item', error),
                Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
                    .until(checkOutUi.checkoutMiniTrackingCardOrderIdText(), isVisible()),

                Check.whether(checkOutUi.checkoutMiniTrackingCardOrderIdText(), isVisible())
                    .andIfSo(
                        await click(checkOutUi.checkoutMiniTrackingCardOrderIdText()),

                        Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
                            .until(checkOutUi.orderSummaryConfirmedStatus(), isVisible()),
                    )
            )
            await checkOut.checkOrderDetails()
        }
    },
    checkOrderDetails: async () => {
        const size = await driver.getWindowSize()

        let checkoutSuggestedDate = await recall(actorMemories.checkoutSuggestedDate)
        checkoutSuggestedDate = checkoutSuggestedDate.replace(/(\D|^)0+(\d+)/, '$1$2')

        const orderSummarySuggestedDeliveryDate = await getTextByElement(checkOutUi.orderSummaryInfoText(targetLabel.orderSummarySuggestedDeliveryDateLabel, elementConstant.orderSummarySuggestedDeliveryDateText, 1))
        await actorInTheSpotlight().attemptsTo(

            Ensure.that(await getTextByElement(checkOutUi.checkoutHeaderTitle(targetLabel.orderSummaryHeaderTitleLabel)), not(or(equals(''), equals('undefined'))))
                .otherwiseFailWith(TestCompromisedError, `the ${targetLabel.orderSummaryHeaderTitleLabel} was expected to not be empty or undefined`),

            Ensure.that(await getTextByElement(checkOutUi.orderSummaryConfirmedStatus()), equals('Confirmado'))
                .otherwiseFailWith(TestCompromisedError, `The ${targetLabel.orderSummaryStatusConfirmedLabel} was expected to be equal "Confirmado"`),

            Ensure.that(orderSummarySuggestedDeliveryDate.trim(), equals(checkoutSuggestedDate))
                .otherwiseFailWith(TestCompromisedError, `The ${targetLabel.orderSummarySuggestedDeliveryDateLabel} was expected to be equal ${checkoutSuggestedDate}`),

            Ensure.that(await getTextByElement(checkOutUi.orderSummaryInfoText(targetLabel.orderSummaryDeliveryDriverLabel, elementConstant.orderSummaryDelivererText, 1)), startsWith('Pendiente'))
                .otherwiseFailWith(TestCompromisedError, `The ${targetLabel.orderSummaryDeliveryDriverLabel} was expected to start with "Pendiente"`),
        )
        const confirmedSection = await resolve(checkOutUi.orderSummaryConfirmedStatus())
        await scrollToPosition(confirmedSection, 0, size.height, 'bottom')
        let totalToPay = await getTextByElement(checkOutUi.orderSummaryInfoText(targetLabel.orderSummaryTotalValueLabel, elementConstant.orderSummaryValueTotalText, 1))
        totalToPay = totalToPay.replace(constants.orderPaymentValueRegexp, '')
        await actorInTheSpotlight().attemptsTo(
            Task.where('#actor checks for the order created details',
                Ensure.that(await getTextByElement(checkOutUi.orderSummaryInfoText(targetLabel.orderSummaryAddressToDeliver, elementConstant.orderSummaryDeliveryAddressText, 1)), equals(await recall(actorMemories.checkoutDeliveryAddress)))
                    .otherwiseFailWith(TestCompromisedError, `The ${targetLabel.orderSummaryAddressToDeliver} was expected to be equal ${await recall(actorMemories.checkoutDeliveryAddress)}`),

                Ensure.that(Number.parseInt(totalToPay), equals(await recall(actorMemories.checkoutOrderTotalValue)))
                    .otherwiseFailWith(TestCompromisedError, `The ${targetLabel.orderSummaryTotalValueLabel}: ${Number.parseInt(totalToPay)} was expected to be equal the checkout total value: ${await recall(actorMemories.checkoutOrderTotalValue)}`),

                Ensure.that(await getTextByElement(checkOutUi.orderSummaryInfoText(targetLabel.orderSummaryPaymentMethodLabel, elementConstant.orderSummaryPaymentMethodText, 1)), equals(await recall(actorMemories.checkoutPaymentMethod)))
                    .otherwiseFailWith(TestCompromisedError, `The ${targetLabel.orderSummaryPaymentMethodLabel} was expected to be equal ${await recall(actorMemories.checkoutPaymentMethod)}`),

                Ensure.that(checkOutUi.orderSummaryButton(targetLabel.orderSummaryHelpButtonLabel, elementConstant.orderSummaryHelpButtonText), isVisible())
                    .otherwiseFailWith(TestCompromisedError, `The ${targetLabel.orderSummaryHelpButtonLabel} was expected to be visible`),

                Ensure.that(checkOutUi.orderSummaryButton(targetLabel.orderSummaryCancelButtonLabel, elementConstant.orderSummaryCancelOrderButtonText), isVisible())
                    .otherwiseFailWith(TestCompromisedError, `The ${targetLabel.orderSummaryCancelButtonLabel} was expected to be visible`)
            )
        )
    },
    waitForCancellation: async (reasonTable = '', randomReasonIndex = 0) => {
        const country: any = await recall(actorMemories.country)
        const { finalReason, atIndex } = reasonTable === '' ? countryReason(country) : { finalReason: reasonTable.trim(), atIndex: randomReasonIndex }

        try {
            await actorInTheSpotlight().attemptsTo(
                Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
                    .until(checkOutUi.orderSummaryConfirmedStatus(), isVisible()),
            )
            await checkOut.cancelOrder(finalReason, atIndex)
        } catch (error) {
            await actorInTheSpotlight().attemptsTo(
                Log.the('It tooks more than 15 seconds to validate the order confirmation screen after it was created. Now, trying from mini-tracking item', error),
                Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
                    .until(checkOutUi.checkoutMiniTrackingCardOrderIdText(), isVisible()),

                Check.whether(checkOutUi.checkoutMiniTrackingCardOrderIdText(), isVisible())
                    .andIfSo(
                        await click(checkOutUi.checkoutMiniTrackingCardOrderIdText()),

                        Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
                            .until(checkOutUi.orderSummaryConfirmedStatus(), isVisible()),
                    )
            )
            await checkOut.cancelOrder(finalReason, atIndex)
        }
    },
    cancelOrder: async (reason: string, index: number) => {
        const size = await driver.getWindowSize()

        await actorInTheSpotlight().attemptsTo(
            Ensure.that(await getTextByElement(checkOutUi.orderSummaryConfirmedStatus()), equals('Confirmado'))
                .otherwiseFailWith(TestCompromisedError, `The ${targetLabel.orderSummaryStatusConfirmedLabel} was expected to be equal "Confirmado"`),
        )
        const confirmedSection = await resolve(checkOutUi.orderSummaryConfirmedStatus())
        await scrollToPosition(confirmedSection, 0, size.height, 'bottom')
        await actorInTheSpotlight().attemptsTo(
            Task.where(`#actor performs order cancellation with reason: ${reason}`,
                Ensure.that(checkOutUi.orderSummaryButton(targetLabel.orderSummaryCancelButtonLabel, elementConstant.orderSummaryCancelOrderButtonText), isVisible())
                    .otherwiseFailWith(TestCompromisedError, `The ${targetLabel.orderSummaryCancelButtonLabel} was expected to be visible`),
                await click(checkOutUi.orderSummaryButton(targetLabel.orderSummaryCancelButtonLabel, elementConstant.orderSummaryCancelOrderButtonText)),

                Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
                    .until(checkOutUi.orderCancellationQuestionReason(), isVisible()),
                Ensure.that(checkOutUi.orderCancellationQuestionReason(), isVisible())
                    .otherwiseFailWith(TestCompromisedError, `${checkOutUi.orderCancellationQuestionReason()} was expected to be visible`)
            )
        )
        if (index > 8) {
            const questionReasonTitle = await resolve(checkOutUi.orderCancellationQuestionReason())
            await scrollToPosition(questionReasonTitle, 0, size.height, 'bottom')
            await checkOut.performOrderCancellation(reason)
        } else {
            await checkOut.performOrderCancellation(reason)
        }
    },
    performOrderCancellation: async (reason: string) => {
        await actorInTheSpotlight().attemptsTo(
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
                .until(checkOutUi.orderSummaryCancellationReason(reason), isVisible()),
            await click(checkOutUi.orderSummaryCancellationReason(reason)),
            Ensure.that(checkOutUi.orderCancellationButton(), isVisible())
                .otherwiseFailWith(TestCompromisedError, `${checkOutUi.orderCancellationButton()} was expected to be visible`),
            await click(checkOutUi.orderCancellationButton()),
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
                .until(checkOutUi.confirmOrderCancellationButton(), isVisible()),
            Ensure.that(checkOutUi.confirmOrderCancellationButton(), isVisible())
                .otherwiseFailWith(TestCompromisedError, `${checkOutUi.confirmOrderCancellationButton()} was expected to be visible`),
            await click(checkOutUi.confirmOrderCancellationButton())
        )
    },
    verifyCancelledOrderDetails: async () => {
        await actorInTheSpotlight().attemptsTo(
            Task.where('#actor verify that order was successfully cancelled',
                Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
                    .until(checkOutUi.cancellationDetailsTotalToPay(), isVisible()),

                Ensure.that(checkOutUi.cancellationDetailsReOrderButton(), isVisible())
                    .otherwiseFailWith(TestCompromisedError, `${checkOutUi.cancellationDetailsReOrderButton()} was expected to be visible`),
                Ensure.that(await getTextByElement(checkOutUi.cancellationDetailsStatus()), equals('Pedido Cancelado'))
                    .otherwiseFailWith(TestCompromisedError, `${checkOutUi.cancellationDetailsStatus()} was expected to be equal: 'Pedido Cancelado'`)
            )
        )
        let totalToPay = await getTextByElement(checkOutUi.cancellationDetailsTotalToPay())
        totalToPay = totalToPay.replace(constants.orderPaymentValueRegexp, '')
        await actorInTheSpotlight().attemptsTo(
            Ensure.that(Number.parseInt(totalToPay), equals(await recall(actorMemories.checkoutOrderTotalValue)))
                .otherwiseFailWith(TestCompromisedError, `${checkOutUi.cancellationDetailsTotalToPay()}: ${Number.parseInt(totalToPay)} was expected to be equal: ${await recall(actorMemories.checkoutOrderTotalValue)}`),
            Ensure.that(checkOutUi.cancellationDetailsHelpButton(), isVisible())
                .otherwiseFailWith(TestCompromisedError, `${checkOutUi.cancellationDetailsHelpButton()} was expected to be visible`)
        )
    },
    reOrderWith: async () => {
        await actorInTheSpotlight().attemptsTo(
            Ensure.that(checkOutUi.cancellationDetailsReOrderButton(), isVisible())
                .otherwiseFailWith(TestCompromisedError, `${checkOutUi.cancellationDetailsReOrderButton()} was expected to be visible`),
            await click(checkOutUi.cancellationDetailsReOrderButton())
        )
    },
    deleteShoppingCart: async() => {
        const size = await driver.getWindowSize()

        const finalCartPrice = await resolve(checkOutUi.cartItemFinalPrice())
        await scrollToPosition(finalCartPrice, 0, size.height, 'bottom')

        await actorInTheSpotlight().attemptsTo(
            await click(checkOutUi.cartEmptyOption()),
            
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
                .until(checkOutUi.cartConfirmEmptyButton(), isVisible()),
            await click(checkOutUi.cartConfirmEmptyButton()),

            Wait.for(Duration.ofSeconds(3))
        )
        const quantityInCart = await getTextByElement(checkOutUi.cartTabBarQuantityInCart())
        await actorInTheSpotlight().attemptsTo(
            Ensure.that(quantityInCart, equals('0'))
                .otherwiseFailWith(TestCompromisedError, `${checkOutUi.cartTabBarQuantityInCart()} was expected to be: 0`)
        )
    },
    checkStoreWithOrderConfirmed: async () => {
        const result: any = await getOrderConfirmed()
        console.table({
            'id': result.id,
            'deletedAt': result.deletedAt,
            'phone': result.Store.phone,
        })
    }
}