export interface userAccountInfoPayload{
    localId : string,
    email : string,
    displayName : string,
    passwordHash : string,
    emailVerified : boolean,
    passwordUpdatedAt : string,
    providerUserInfo : Array<any>,
    validSince : string,
    disabled : boolean,
    lastLoginAt : string,
    createdAt : string,
    customAuth : boolean,
    phoneNumber : string,
    customAttributes : string,
    lastRefreshAt : string
}