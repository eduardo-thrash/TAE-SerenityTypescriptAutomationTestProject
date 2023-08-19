import { actorInTheSpotlight,LogicError} from '@serenity-js/core'
import { LastResponse, PostRequest, Send } from '@serenity-js/rest'

import { constants } from '../../../constants/constants'
import { endPoints } from '../../../constants/endPoints'
import { httpCodes } from '../../../constants/httpCodes'
import { GetAccountInfoBuilder } from '../../../dtos/onboarding/builders/getAccountInfoBuilders'
import { GetAccountInfoPayload } from '../../../dtos/onboarding/getAccountInfoPayload'
import { GetAccountInfoResponse } from '../../../dtos/onboarding/getAccountInfoResponse'
import { apiAsserts } from '../../../helpers/apiAsserts'
import { callAnApi } from '../../../helpers/callApi'
import { configs } from '../../../helpers/configs'

export const getAccountInfo = {
    byIdToken : async (idToken: string): Promise<GetAccountInfoResponse> => {
    
        const getAccountInfoPayload : GetAccountInfoPayload = GetAccountInfoBuilder(idToken)

        await callAnApi(
            Send.a(
                PostRequest.to(endPoints.getAccountInfo)
                .with(JSON.stringify(getAccountInfoPayload))
                .using({timeout : constants.apiDefaultTimeOut, headers : configs.apiDefaultHeaders })
            )
        )

        await apiAsserts.successResponse(httpCodes.OK)
        const getAccountInfoResponse : GetAccountInfoResponse = await actorInTheSpotlight().answer(LastResponse.body<GetAccountInfoResponse>())
        
        if(!getAccountInfoResponse.users[0]){
            throw new LogicError('The endpoint getAccountInfo did not return any user information in Users position')
        }
        
        return getAccountInfoResponse
    }
}