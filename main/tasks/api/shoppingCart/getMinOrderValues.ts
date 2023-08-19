import { actorInTheSpotlight } from '@serenity-js/core'
import { GetRequest,LastResponse,Send } from '@serenity-js/rest'

import { constants } from '../../../constants/constants'
import { endPoints } from '../../../constants/endPoints'
import { MinOrderValuesResponse } from '../../../dtos/shoppingCart/getMinOrderValuesResponse'
import { callAnApi } from '../../../helpers/callApi'
import { configs } from '../../../helpers/configs'

export const getMinOrderValues = {
    to : async (idToken: string, storeId: number): Promise<MinOrderValuesResponse> => {

        await callAnApi(
            Send.a(
                GetRequest.to(endPoints.minOrderValues.replace('{{store_id}}', storeId.toString()))
                .using({timeout : constants.apiDefaultTimeOut, headers :{authorization: `Bearer ${idToken}`, ...configs.apiDefaultHeaders} })
            ),
        )

        const minOrderValuesResponse : MinOrderValuesResponse = await actorInTheSpotlight().answer(LastResponse.body<MinOrderValuesResponse>()) 
        
        return minOrderValuesResponse
    }
}