import { Ensure } from '@serenity-js/assertions'
import { actorInTheSpotlight,Log } from '@serenity-js/core'
import { isVisible } from '@serenity-js/webdriverio'

import { actorMemories } from '../../constants/actorMemories'
import { getOtpByPhone } from '../../db/access/verificationCode'
import { recall, remember } from '../../helpers/actorMemory'
import { onboardingUi } from '../../ui/web/onboardingUi'

export const onboardingOtp = {
    send: async () => {
        console.log('recall country y phone')
        const country : any  = await recall(actorMemories.country)
        const phone : number = await recall(actorMemories.phone)
        Log.the('test', 'test2')
        const otp : any = await getOtpByPhone(phone, country)
        
        console.table({
            'country' : country,
            'phone' : phone,
            'otp' : otp
        })

        actorInTheSpotlight().attemptsTo(
            Ensure.that(onboardingUi.assistButton(), isVisible()),
            Ensure.that(onboardingUi.resendButton(), isVisible()),
        )
        await remember (actorMemories.otp, otp.code)                
    },

    check: async () => {
        const otp : string = await recall(actorMemories.otp)
        const otpArray : Array<string> = otp.split('')
        console.log('arreglo otp', otpArray)
        
    } 
}
