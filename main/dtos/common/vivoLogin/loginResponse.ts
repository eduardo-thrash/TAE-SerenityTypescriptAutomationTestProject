export interface loginResponse {
    customToken: string,
    error: boolean,
    message: string,
    status: string,
    userPermissions: Array<any>,
    userRoles: Array<any>
}