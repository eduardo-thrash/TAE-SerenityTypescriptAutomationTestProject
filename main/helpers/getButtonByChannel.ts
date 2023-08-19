
import { constants } from '../constants/constants'
import { onboardingUI } from '../ui/mobile/onboarding'

export const getButtonByChannel = (channel: string) => {
    switch (channel) {
        case constants.smsChannel:
            return onboardingUI.smsButton()

        case constants.callChannel:
            return onboardingUI.callButton()

        case constants.whatsappChannel:
            return onboardingUI.wspButton()
    }
}