import { endsWith, Ensure } from '@serenity-js/assertions'
import { actorInTheSpotlight, Duration, Task, TestCompromisedError } from '@serenity-js/core'
import { isEnabled, isVisible, Wait } from '@serenity-js/webdriverio'

import { actorMemories } from '../../constants/actorMemories'
import { constants } from '../../constants/constants'
import { getOtpByPhone } from '../../db/access/verificationCode'
import { click, enterValue, webScroll } from '../../helpers/actions'
import { recall, remember } from '../../helpers/actorMemory'
import { countryData } from '../../helpers/country'
import { randomNumbers } from '../../helpers/randomNumbers'
import { loginUi } from '../../ui/web/loginUi'
import { onboardingUi } from '../../ui/web/onboardingUi'

export const login = {
    verifyUrl : async (currentUrl : string) =>
    
        Task.where('#actor ensures that Vivo url loads and redirects as expected',
            Ensure.that(currentUrl, endsWith(constants.vivoLoginUrlRedirected))
        )
    ,
    verifyElements : () =>
        Task.where('#actor ensures that the inputs email and password, link forgot password and login button is ready to use ',
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
                .until(loginUi.email() , isVisible()),
                
            Ensure.that(loginUi.email(), isVisible()),
            Ensure.that(loginUi.email(), isEnabled()),
            Ensure.that(loginUi.password(), isVisible()),
            Ensure.that(loginUi.password(), isEnabled()),
            Ensure.that(loginUi.forgotPassword(), isVisible()),
            Ensure.that(loginUi.forgotPassword(), isEnabled()),
            Ensure.that(loginUi.loginButton(), isVisible())
        )
    ,
    using : async (user : string , password: string) =>
        Task.where(`#actor login to Vivo Web using user ${user} and password ${password}`,
            await enterValue(loginUi.email(), user),
            await enterValue(loginUi.password(), password),
            Ensure.that(loginUi.loginButton(), isEnabled()),
            await click(loginUi.loginButton())
        ),

    sendOtp : async (country: string, channel: string, isNew = false) =>
    {       
        const phone : number = isNew ? randomNumbers.randomNumbers(country) : Number.parseInt(countryData(country).phoneNumber)
        const countryIndex : number = countryData(country).index
        await remember (actorMemories.phone, phone)
        await remember (actorMemories.country, country)
        
        await actorInTheSpotlight().attemptsTo(
            await click(onboardingUi.countrySelector()),                                      
            await click(onboardingUi.countryFlag(countryIndex)),                     
            Ensure.that(onboardingUi.inputPhoneNumber(), isVisible()),
            await click(onboardingUi.inputPhoneNumber()),
            await enterValue(onboardingUi.inputPhoneNumber(), phone),
            await click(onboardingUi.channelOptions(channel)))    
    }, 
    
    checkOtp : async () => {
        const country : any  = await recall(actorMemories.country)
        const phone : number = await recall(actorMemories.phone)
        const otp : any = await getOtpByPhone(phone, country)

        console.table({
            'country' : country,
            'phone' : phone,
            'otp' : otp
        })

        await actorInTheSpotlight().attemptsTo(
            Ensure.that(onboardingUi.assistButton(), isVisible()).otherwiseFailWith(TestCompromisedError, 'The assistant button is not visible'),
            Ensure.that(onboardingUi.resendButton(), isVisible()).otherwiseFailWith(TestCompromisedError, 'The resend code button is not visible'),
        )
      
        const otpArray : Array<string> = otp.code.split('')
        console.log('arreglo otp', otpArray)

        await actorInTheSpotlight().attemptsTo(
            await enterValue(onboardingUi.otpInput(0), otpArray[0]),
            await enterValue(onboardingUi.otpInput(1), otpArray[1]),
            await enterValue(onboardingUi.otpInput(2), otpArray[2]),
            await enterValue(onboardingUi.otpInput(3), otpArray[3])
        )
    },
    
    logout : async () => {
        await actorInTheSpotlight().attemptsTo(
            await click(onboardingUi.AccountButton()),
            await webScroll(onboardingUi.AccountSections(1)),
            await webScroll(onboardingUi.AccountSections(2)),
            await webScroll(onboardingUi.AccountSections(3)),
            await webScroll(onboardingUi.AccountSections(4)),
            await webScroll(onboardingUi.AccountSections(5)),
            await click(onboardingUi.AccountLogOutButton()),
            await click(onboardingUi.AccountLogOutConfirmationButton())
        )
    }
}