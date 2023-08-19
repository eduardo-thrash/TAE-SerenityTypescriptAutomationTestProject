import { Ensure } from '@serenity-js/assertions';
import { actorInTheSpotlight, Duration, Task, TestCompromisedError } from '@serenity-js/core';
import { isVisible, Wait } from '@serenity-js/webdriverio';

import { constants } from '../../constants/constants';
import { click } from '../../helpers/actions';
import { dashBoardUi } from '../../ui/web/dashBoardUi';

export const dashBoard = {

    verifyElements : async () =>
        await actorInTheSpotlight().attemptsTo(
            Task.where('#actor ensures that  dashBoard elements are visible',
                Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
            .until(dashBoardUi.closeWelcomeToolTip() , isVisible()),
                Ensure.that(dashBoardUi.closeWelcomeToolTip(), isVisible())
                .otherwiseFailWith(TestCompromisedError, 'The welcome tooltip is not visible'),
                await click(dashBoardUi.closeWelcomeToolTip()),
                Ensure.that(dashBoardUi.SearchBarInput(), isVisible())
                .otherwiseFailWith(TestCompromisedError, 'The SearchBar input is not visible'),
                Ensure.that(dashBoardUi.currentAddress(), isVisible())
                .otherwiseFailWith(TestCompromisedError, 'The current address information is not visible'),
                Ensure.that(dashBoardUi.categoriesContainer(), isVisible())
                .otherwiseFailWith(TestCompromisedError, 'The Categories container is not visible'),
                Ensure.that(dashBoardUi.storeHomeButton(), isVisible())
                .otherwiseFailWith(TestCompromisedError, 'The store button is not visible'),
                Ensure.that(dashBoardUi.accountHomeButton(), isVisible())
                .otherwiseFailWith(TestCompromisedError, 'The account button is not visible'),
                Ensure.that(dashBoardUi.carHomeButton(), isVisible())
                .otherwiseFailWith(TestCompromisedError, 'The Car button is not visible'),

            )),

}