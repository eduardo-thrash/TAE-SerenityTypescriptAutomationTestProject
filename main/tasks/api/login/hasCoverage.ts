/* eslint-disable unicorn/no-null */
import { actorInTheSpotlight} from '@serenity-js/core'
import { LastResponse, PostRequest, Send } from '@serenity-js/rest'

import { constants } from '../../../constants/constants'
import { endPoints } from '../../../constants/endPoints'
import { httpCodes } from '../../../constants/httpCodes'
import { HasCoverageBuilder } from '../../../dtos/onboarding/builders/hasCoverageBuilder'
import { hasCoveragePayload } from '../../../dtos/onboarding/hasCoveragePayload'
import { HasCoverageResponse } from '../../../dtos/onboarding/hasCoverageResponse'
import { apiAsserts } from '../../../helpers/apiAsserts'
import { callAnApi } from '../../../helpers/callApi'
import { configs } from '../../../helpers/configs'

export const hasCoverage = {
    to : async (addressData: string, countryId: number, lat: bigint | number, long: bigint | number, storeId = null) => {
        
        const hasCoveragePayload : hasCoveragePayload = HasCoverageBuilder(addressData, countryId, lat, long, storeId)

        await callAnApi(
            Send.a(
                PostRequest.to(endPoints.hasCoverage)                
                .with(JSON.stringify(hasCoveragePayload))
                .using({timeout : constants.apiDefaultTimeOut, headers : configs.apiDefaultHeaders })
            )
        )

        await apiAsserts.successResponse(httpCodes.OK)
        const hasCoverageResponse : HasCoverageResponse = await actorInTheSpotlight().answer(LastResponse.body<HasCoverageResponse>())
        
        return hasCoverageResponse
    }
}
