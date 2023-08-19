import { actorInTheSpotlight} from '@serenity-js/core'
import { LastResponse, PostRequest, Send } from '@serenity-js/rest'

import { constants } from '../../../constants/constants'
import { endPoints } from '../../../constants/endPoints'
import { httpCodes } from '../../../constants/httpCodes'
import { verifyCustomTokenBuilder } from '../../../dtos/onboarding/builders/verifyCustomTokenBuilder'
import { verifyCustomTokenPayload } from '../../../dtos/onboarding/verifyCustomTokenPayload'
import { verifyCustomTokenResponse } from '../../../dtos/onboarding/verifyCustomTokenResponse'
import { apiAsserts } from '../../../helpers/apiAsserts'
import { callAnApi } from '../../../helpers/callApi'
import { configs } from '../../../helpers/configs'

export const verifyCustomToken = {

    with : async (customToken: string) : Promise<verifyCustomTokenResponse> => {

        const verifyCustomPayload: verifyCustomTokenPayload = verifyCustomTokenBuilder(customToken)

        await callAnApi(
            Send.a(
                PostRequest.to(endPoints.verifyCustomToken)
                .with(JSON.stringify(verifyCustomPayload))
                .using({timeout : constants.apiDefaultTimeOut, headers : configs.apiDefaultHeaders })
            )
        )

        await apiAsserts.successResponse(httpCodes.OK)

        const verifyCustomTokenResponse : verifyCustomTokenResponse = await actorInTheSpotlight().answer(LastResponse.body<verifyCustomTokenResponse>())

        return verifyCustomTokenResponse
    }
}