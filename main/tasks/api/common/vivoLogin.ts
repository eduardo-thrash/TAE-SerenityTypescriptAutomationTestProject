import { Ensure, equals } from '@serenity-js/assertions'
import { actorInTheSpotlight } from '@serenity-js/core'
import { LastResponse, PostRequest, Send } from '@serenity-js/rest'
import * as dotenv from 'dotenv'

import { actorMemories } from '../../../constants/actorMemories'
import { constants } from '../../../constants/constants'
import { endPoints } from '../../../constants/endPoints'
import { httpCodes } from '../../../constants/httpCodes'
import { loginPayload } from '../../../dtos/common/vivoLogin/loginPayload'
import { loginResponse } from '../../../dtos/common/vivoLogin/loginResponse'
import { remember } from '../../../helpers/actorMemory'
import { callAnApi } from '../../../helpers/callApi'
import { configs } from '../../../helpers/configs'
import { finishTest } from '../../../helpers/finishTest'

dotenv.config()

export const login = {
    to : async () => {
    
        const Payload : loginPayload = {'application':constants.applicationName,'email':process.env.VIVO_ADMIN_USER,'password':process.env.VIVO_ADMIN_PASSWORD}
        
        await callAnApi(
            Send.a(
                PostRequest.to(endPoints.vivoLogin)
                    .with(JSON.stringify(Payload))
                    .using({timeout : constants.apiDefaultTimeOut, headers : configs.apiDefaultHeaders})),
        )

        await actorInTheSpotlight().attemptsTo(
            Ensure.that(LastResponse.status(), equals(httpCodes.OK)),
        )
            
        const response : loginResponse = await actorInTheSpotlight().answer(LastResponse.body<loginResponse>())
        
        await remember(actorMemories.customToken,response.customToken)
        
        return finishTest()
    }
}