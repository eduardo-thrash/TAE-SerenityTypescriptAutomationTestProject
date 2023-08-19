export interface verifyCustomTokenResponse {
    expiresIn: string,
    idToken: string,
    isNewUser: boolean,
    kind: string,
    refreshToken: string
}