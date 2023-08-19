export interface StartSignUpResponse {
    storeId: number,
    userId: number,
    email: string,
    authorizationCode: string,
    customToken: string
}