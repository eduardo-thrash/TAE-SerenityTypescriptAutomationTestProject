export interface StartSignUpPayload {
    address: SignUpAddressPayload,
    lastName: string,
    firstName: string,
    phoneCode: number,
    storeName: string,
    businessTypeId: number,
    adhereToNewFlow: boolean,
    acceptedDocumentsIds: number[],
    phone: number,
    idToken: string,
    preferredMacroCategoriesIds: number[],
    email: string
}

export interface SignUpAddressPayload {
    latitude: bigint | number,
    longitude: bigint | number,
    formatted: string,
    additionalInfo: string
}