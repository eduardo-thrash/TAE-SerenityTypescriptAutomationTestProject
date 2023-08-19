import { Ensure, startsWith } from '@serenity-js/assertions'
import { actorInTheSpotlight,Duration, TestCompromisedError } from '@serenity-js/core'
import { isVisible,Wait } from '@serenity-js/webdriverio'

import { actorMemories } from '../../constants/actorMemories'
import { constants } from '../../constants/constants'
import { click, enterValue } from '../../helpers/actions'
import { recall, remember } from '../../helpers/actorMemory'
import { addressCountry } from '../../helpers/addressCountry'
import { getTextByElement } from '../../helpers/text'
import { onboardingUI } from '../../ui/mobile/onboarding'

export const onboarding = {
    updateAddress: async () => {
        const country : any  = await recall(actorMemories.country)        
        await actorInTheSpotlight().attemptsTo(
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
            .until(onboardingUI.accountButton(), isVisible()),
            Wait.for(Duration.ofSeconds(3)),
            await click(onboardingUI.accountButton()),

            await click(onboardingUI.accountDeliveryDataButton()),
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
            .until(onboardingUI.editButtonAddress(), isVisible()),
            Wait.for(Duration.ofSeconds(3)),
            await click(onboardingUI.editButtonAddress()),

            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
            .until(onboardingUI.closeButtonInputAddress(), isVisible()),
            await click(onboardingUI.closeButtonInputAddress()),
            await click(onboardingUI.closeButtonInputAddress()),
            await click(onboardingUI.inputAdress()),
            await click(onboardingUI.inputAdress()),
            await enterValue(onboardingUI.inputAdress(), addressCountry.addressUpdate(country)),

            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
            .until(onboardingUI.resultAddress(), isVisible()),
            await click(onboardingUI.resultAddress()),
            await click(onboardingUI.resultAddress())     
        )
        await remember(actorMemories.address, await getTextByElement(onboardingUI.mapAddress()))
    },

    checksAddressUpdate: async () => {        
        await actorInTheSpotlight().attemptsTo(
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
            .until(onboardingUI.finishButton(), isVisible()),

            Wait.for(Duration.ofSeconds(3)),            
            await click(onboardingUI.finishButton()),

            Wait.for(Duration.ofSeconds(25)),    
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
            .until(onboardingUI.addressFieldDeliveryData(), isVisible()),     
        )     
        const address = await getTextByElement(onboardingUI.addressFieldDeliveryData())  
       
        await actorInTheSpotlight().attemptsTo(
        
            Ensure.that(address, startsWith(await recall(actorMemories.address)))
                .otherwiseFailWith(TestCompromisedError, 'The address was not updated correctly')  
        )
        
    }
}