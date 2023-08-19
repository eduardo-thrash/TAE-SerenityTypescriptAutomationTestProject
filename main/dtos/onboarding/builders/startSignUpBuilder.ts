import { SignUpAddressPayload, StartSignUpPayload } from '../startSignUpPayload';

export const StartSignUpPayloadBuilder = (signUpAddressPayload: SignUpAddressPayload, lastName: string, firstName: string, phoneCode: number, storeName: string, businessTypeId: number, acceptedDocumentsIds: number[], phone: number, idToken: string, preferredMacroCategoriesIds: number[], email: string): StartSignUpPayload => (
    {
        address: signUpAddressPayload,
        lastName,
        firstName,
        phoneCode,
        storeName,
        businessTypeId,
        adhereToNewFlow: true,
        acceptedDocumentsIds,
        phone,
        idToken,
        preferredMacroCategoriesIds,
        email
    }
)

export const SignUpAddressPayloadBuilder = (latitude: bigint | number, longitude: bigint | number, formatted: string, additionalInfo: string): SignUpAddressPayload =>(
    {
        latitude,
        longitude,
        formatted,
        additionalInfo
    }
)