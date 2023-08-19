import { Ensure } from '@serenity-js/assertions';
import { actorInTheSpotlight, Duration, Task } from '@serenity-js/core';
import { isEnabled, isVisible, Wait } from '@serenity-js/webdriverio';

import { constants } from '../../constants/constants';
import { click, enterValue } from '../../helpers/actions';
import { remember } from '../../helpers/actorMemory';
import { countryData } from '../../helpers/country';
import { registerUi } from '../../ui/web/registerUi';

export const registerProcess = {

    addPersonalData : async () =>
        await actorInTheSpotlight().attemptsTo(
            Task.where('#actor ensures that registration form is available and can interact it',
                Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
            .until(registerUi.registerFirstNameInput() , isVisible()),
                Ensure.that(registerUi.registerFirstNameInput(), isVisible()),
                await enterValue(registerUi.registerFirstNameInput(), constants.newUserFirstName),
                Ensure.that(registerUi.registerLastNameInput(), isVisible()),
                await enterValue(registerUi.registerLastNameInput(), constants.newUserLastName),
                Ensure.that(registerUi.registerStoreNameInput(), isVisible()),
                await enterValue(registerUi.registerStoreNameInput(), constants.newUserStoreName),
                Ensure.that(registerUi.termsAndConditionsCheckbox(), isVisible()),
                await click(registerUi.termsAndConditionsCheckbox()),
                Ensure.that(registerUi.personalDataCheckbox(), isVisible()),
                await click(registerUi.personalDataCheckbox()),
                Ensure.that(registerUi.finishRegisterButton(), isEnabled()),
                await click(registerUi.finishRegisterButton()),
            )),

    enterLocationData :  async (country: string) =>
    {
        const adress: string = countryData(country).address
        await remember ('country', country)
        await actorInTheSpotlight().attemptsTo(
            Task.where(`#actor ensures that location forms is available to complete`,
                Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
                .until(registerUi.registerAddressInput() , isVisible()),
                await enterValue(registerUi.registerAddressInput(), adress.toString()),
                Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
            .until(registerUi.resultRegisterAddressInput() , isVisible()),
                Ensure.that(registerUi.resultRegisterAddressInput(), isVisible()),
                await click(registerUi.resultRegisterAddressInput()),
                Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
            .until(registerUi.confirmRegisterAddressInput() , isVisible()),
                Ensure.that(registerUi.confirmRegisterAddressInput(), isVisible()),
                await click(registerUi.confirmRegisterAddressInput()),
                Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
            .until(registerUi.aditionalAddressIndicationsInput() , isVisible()),
                Ensure.that(registerUi.aditionalAddressIndicationsInput(), isVisible()),
                await enterValue(registerUi.aditionalAddressIndicationsInput(), constants.newUserBussinessAddressDetails),
                Ensure.that(registerUi.completeRegisterButton(), isEnabled()),
                await click(registerUi.completeRegisterButton()),

            ))
    }
}