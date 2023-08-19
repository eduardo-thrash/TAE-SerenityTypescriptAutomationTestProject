import { Ensure, equals, isFalse, isTrue } from '@serenity-js/assertions';
import { actorInTheSpotlight,Expectation, TestCompromisedError } from '@serenity-js/core';

import { constants } from '../../../constants/constants';
import { GetShoppingCartResponse } from '../../../dtos/shoppingCart/getShoppingCartResponse';

export const validateShoppingCart = {
    checkShoppingCartResult: async (getShoppingCartResponse: GetShoppingCartResponse, isPosible: string) => {
        const flagExpectationBooleanType: Expectation<boolean> = isPosible === constants.shoppingCartIsPossibleToCreateOrder ? isTrue() : isFalse()
        const keywordExpectation : string = isPosible === constants.shoppingCartIsPossibleToCreateOrder ? '' : 'not'

        await actorInTheSpotlight().attemptsTo(
            Ensure.that(getShoppingCartResponse.carts[0].hasCompleteMinimumOrder, flagExpectationBooleanType)
                .otherwiseFailWith(TestCompromisedError, `It was ${keywordExpectation} expected that the minimum order value has been completed to purchase an order`),
            Ensure.that(getShoppingCartResponse.status, equals(constants.shoppingCartOkStatus))
                .otherwiseFailWith(TestCompromisedError, 'It was expected that the shopping cart status was "OK"')
        )
    }
}