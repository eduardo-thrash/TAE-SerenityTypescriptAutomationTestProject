import { endsWith,Ensure } from '@serenity-js/assertions';
import { actorInTheSpotlight, Check, Duration, Task } from '@serenity-js/core';
import { isVisible, Wait } from '@serenity-js/webdriverio';

import { constants } from '../../constants/constants';
import { click } from '../../helpers/actions';
import { onboardingUi } from '../../ui/web/onboardingUi';

export const onboardingProcess = {

    verifyUrl : async (currentUrl : string) =>
        await actorInTheSpotlight().attemptsTo( 
            Task.where('#actor ensures that Ecommerce url loads and redirects as expected',
                Ensure.that(currentUrl, endsWith(constants.ecommerceUrl))
            )),

    onboardingTooltip : async () =>
        await actorInTheSpotlight().attemptsTo(
            Task.where(`#actor ensures that the firts tooltip is present and can close it`,
                Check.whether(onboardingUi.appChiperTooltip(), isVisible())
        .andIfSo(await click(onboardingUi.appChiperTooltip()))  
            )),

    onboardingStart : async () =>
        await actorInTheSpotlight().attemptsTo(
            Task.where(`#actor ensures that onboarding process can begin`,
                Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
                .until(onboardingUi.getInButton() , isVisible()),
                Ensure.that(onboardingUi.getInButton(), isVisible()),
                await click(onboardingUi.getInButton()),
                Ensure.that(onboardingUi.locationPermissionsButton(), isVisible()),
                await click(onboardingUi.locationPermissionsButton()),
            ))          
}   
