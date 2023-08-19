import { Ensure, equals } from '@serenity-js/assertions'
import { actorInTheSpotlight } from '@serenity-js/core'
import { LastResponse, PostRequest, Send } from '@serenity-js/rest'
import * as dotenv from 'dotenv'

import { actorMemories } from '../../../constants/actorMemories'
import { constants } from '../../../constants/constants'
import { endPoints } from '../../../constants/endPoints'
import { httpCodes } from '../../../constants/httpCodes'
import { verifyCustomTokenPayload } from '../../../dtos/common/vivoLogin/verifyCustomTokenPayload'
import { verifyCustomTokenResponse } from '../../../dtos/common/vivoLogin/verifyCustomTokenResponse'
import { recall, remember } from '../../../helpers/actorMemory'
import { callAnApi } from '../../../helpers/callApi'
import { configs } from '../../../helpers/configs'
import { finishTest } from '../../../helpers/finishTest'

dotenv.config()

export const verifyCustomToken = {
    with : async () => {
        
        const Payload : verifyCustomTokenPayload = {returnSecureToken : true , token : await recall(actorMemories.customToken)}
        
        await callAnApi(
            Send.a(
                PostRequest.to(endPoints.verifyCustomToken)
                .with(JSON.stringify(Payload))
                .using({timeout : constants.apiDefaultTimeOut, headers:configs.apiDefaultHeaders})
            )
        )

        await actorInTheSpotlight().attemptsTo(
            Ensure.that(LastResponse.status(), equals(httpCodes.OK)),
        )            
        
        const response : verifyCustomTokenResponse = await actorInTheSpotlight().answer(LastResponse.body<verifyCustomTokenResponse>())
        
        await remember(actorMemories.idToken, response.idToken)
        
        return finishTest()
    }
}