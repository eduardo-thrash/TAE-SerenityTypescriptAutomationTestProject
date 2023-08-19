import { Ensure } from '@serenity-js/assertions';
import { actorInTheSpotlight, Duration, Task, TestCompromisedError } from '@serenity-js/core'
import { isVisible,Wait } from '@serenity-js/webdriverio';

import { actorMemories } from '../../constants/actorMemories';
import { constants } from '../../constants/constants';
import { getOtpByPhone } from '../../db/access/verificationCode';
import { click, enterValue, scrollToPosition } from '../../helpers/actions';
import { recall, remember } from '../../helpers/actorMemory';
import { countryData } from '../../helpers/country';
import { resolve } from '../../helpers/element';
import { getLoginByChannel } from '../../helpers/getLoginByChannel';
import { onboardingUI } from '../../ui/mobile/onboarding';

export const login = {
    isVisible: async () =>
        await actorInTheSpotlight().attemptsTo(
            Task.where(`#actor views welcome screen`,
                Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts)) 
                    .until(onboardingUI.loginAccount(), isVisible()),
                    
                Ensure.that(onboardingUI.loginAccount(), isVisible()).
                otherwiseFailWith(TestCompromisedError, 'The onboarding welcome button is not visible'),
            )
        ),

    welcomeEnter: async () =>
        await actorInTheSpotlight().attemptsTo(
            Task.where(`#actor enters welcome button to continue the onboarding`,
                Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts)) 
                    .until(onboardingUI.loginAccount(), isVisible()),
                    
                await click(onboardingUI.loginAccount())
            )
        ),
        
    using: async (country: string, channel: string, containsOrders = false) =>
    {
        const phone: string = countryData(country).phoneNumber
        await remember('phone',phone)
        await remember('country', country)
        
        await actorInTheSpotlight().attemptsTo(
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts)) 
                .until(onboardingUI.countryOptions(), isVisible()),
                
            Ensure.that(onboardingUI.countryOptions(), isVisible())
            .otherwiseFailWith(TestCompromisedError, 'The country options is not visible'),

            await click(onboardingUI.countryOptions()),
            
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts)) 
                .until(onboardingUI.selectCountry(country), isVisible()),

            await click(onboardingUI.selectCountry(country)),
            
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts)) 
                .until(onboardingUI.phoneNumberInput(), isVisible()),
                
            Ensure.that(onboardingUI.phoneNumberInput(), isVisible())
            .otherwiseFailWith(TestCompromisedError, 'The enter phone number input is not visible'),
            
            await enterValue(onboardingUI.phoneNumberInput(), phone.toString()),
            
            await click(getLoginByChannel(channel))
        )
    },

    checkOtp: async () => {
        const country : any  = await recall(actorMemories.country)
        const phone : number = await recall(actorMemories.phone)
        const otp : any = await getOtpByPhone(phone, country)
        
        console.table({
            'country' : country,
            'phone' : phone,
            'otp' : otp
        })
    
        const otpField = await onboardingUI.otpField().answeredBy(actorInTheSpotlight())
        otpField.sendKeys([otp.code]) // 22 segundos

    },
    
    closeSession : async () => {
        await actorInTheSpotlight().attemptsTo(
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts)) 
                .until(onboardingUI.profileButton(), isVisible()),
                
            Ensure.that(onboardingUI.profileButton(), isVisible())
            .otherwiseFailWith(TestCompromisedError, 'The profile Button is not visible'),

            await click(onboardingUI.profileButton()),

            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
                .until(onboardingUI.profileInformation(), isVisible())
        )
        
        let band = 0, retries = 3
        
        while(band == 0 && retries > 0){
            const windowSize = await driver.getWindowSize()
            const profileInformation= await resolve(onboardingUI.profileInformation())

            await scrollToPosition(profileInformation, 0, windowSize.height, 'bottom')

            try{
                await actorInTheSpotlight().attemptsTo(
                    Wait.upTo(Duration.ofSeconds(5))
                        .until(onboardingUI.closeSessionButton(), isVisible()),
                    await click(onboardingUI.closeSessionButton()),
                    await click(onboardingUI.closeSessionButtonConfirm())
                )
                band = 1
            } catch {
                band = 0
                retries--
            }

        }
    }, 

    enterInvalidOtp : async () => {
        const invalidOtp = constants.invalidOtp        
        await actorInTheSpotlight().attemptsTo(
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts)) 
            .until(onboardingUI.otpField(), isVisible()),
            await enterValue(onboardingUI.otpField(), invalidOtp)
        )
    },

    checksInvalidOtp : async (messageOtpInvalid : string) => {
        await actorInTheSpotlight().attemptsTo(            
            Ensure.that(onboardingUI.invalidOtpMessage(), isVisible())
            .otherwiseFailWith(TestCompromisedError, 'The validate that the otp was invalid is not displayed'),

            Ensure.that(onboardingUI.otpField(), isVisible())
            .otherwiseFailWith(TestCompromisedError, 'The message to validate that the otp was invalid is not displayed'),

            Ensure.that(onboardingUI.resendOtpcode(), isVisible())
            .otherwiseFailWith(TestCompromisedError, 'The resend OTP code is not displayed'),
        )
    },

    userWithoutOrders : async (country: string, channel: string) => {
        await login.using(country, channel)
    }
}