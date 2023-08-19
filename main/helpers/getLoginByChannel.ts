import { constants } from '../constants/constants'
import { onboardingUI } from '../ui/mobile/onboarding'

export const getLoginByChannel = (channel: string) => {
    switch (channel) {
        case constants.smsChannel:
            return onboardingUI.smsButton()

        case constants.callChannel:
            return onboardingUI.callButton()

        case constants.whatsappChannel:
            return onboardingUI.wspButton()
    }
}

export const getApiLoginByChannel = (channel: string) => {
    switch (channel) {
        case 'whatsapp': {
            return 'wa'
        }
        case 'sms': {
            return 'sms'
        }
        case 'llamada': {
            return 'call'
        }
    }
}