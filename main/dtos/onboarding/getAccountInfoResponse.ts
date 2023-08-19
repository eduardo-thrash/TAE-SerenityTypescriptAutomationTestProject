import { userAccountInfoPayload } from './userAccountInfoPayload';

export interface GetAccountInfoResponse {
    kind : string,
    users  : Array<userAccountInfoPayload>
}