import { constants } from '../../../constants/constants';
import { checkOtpPayload } from '../otp/checkOtpPayload';
import { sendOtpPayload } from '../otp/sendOtpPayload';

export const sendOtpBuilder = (phone: string, phoneCode: string, channel:string): sendOtpPayload => (
    {
        phoneNumber: phone,
        phoneCode: phoneCode,
        channel : channel,
        os : constants.web,
        fourDigits : true
    }
)

export const checkOtpBuilder = (phone: string, phoneCode: string, otpCode: string): checkOtpPayload => (
    {
        phoneNumber : phone,
        phoneCode : phoneCode,
        otp : otpCode
    }
)