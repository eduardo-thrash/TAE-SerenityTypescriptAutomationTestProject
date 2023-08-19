import { verifyCustomTokenPayload } from '../verifyCustomTokenPayload';

export const verifyCustomTokenBuilder = (customToken: string) : verifyCustomTokenPayload => (
    {
        token : customToken,
        returnSecureToken : true
    }
)