export interface sendOtpPayload {
    phoneNumber : string,
    phoneCode : string,
    channel : string,
    os : string,
    fourDigits : boolean
}