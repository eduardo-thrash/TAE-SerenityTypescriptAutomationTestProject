import { actorInTheSpotlight } from '@serenity-js/core'
import { GetRequest, LastResponse, Send } from '@serenity-js/rest'

import { constants } from '../../../constants/constants'
import { endPoints } from '../../../constants/endPoints'
import { httpCodes } from '../../../constants/httpCodes'
import { MsUserResponse } from '../../../dtos/onboarding/msUserResponse'
import { apiAsserts } from '../../../helpers/apiAsserts'
import { callAnApi } from '../../../helpers/callApi'
import { configs } from '../../../helpers/configs'

export const msUser ={
    /*
        bylocalId: Recibe dos parámetros localId y isOldUser, cuando el usuario es nuevo
        Para usuarios existentes, solo se envía localId
    */
    byLocalId : async (localId: string, isOldUser = true): Promise<MsUserResponse> => {
        
        await callAnApi(
            Send.a(
                GetRequest.to(endPoints.msUser.replace('{{local_id}}', localId))
                .using({timeout : constants.apiDefaultTimeOut, headers : configs.apiDefaultHeaders })
            )
        )

        isOldUser === true ? await apiAsserts.successResponse(httpCodes.OK) : await apiAsserts.successResponse(httpCodes.BAD_REQUEST)

        const msUserResponse : MsUserResponse = await actorInTheSpotlight().answer(LastResponse.body<MsUserResponse>())

        return msUserResponse
    }
}