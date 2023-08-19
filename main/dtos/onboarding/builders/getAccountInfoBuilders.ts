import { GetAccountInfoPayload } from '../getAccountInfoPayload';

export const GetAccountInfoBuilder = (idToken: string): GetAccountInfoPayload => (
    {
        idToken
    }
)