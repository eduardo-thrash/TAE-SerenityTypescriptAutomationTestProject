import { GetRequest, Send } from '@serenity-js/rest'

import { actorMemories } from '../../../constants/actorMemories'
import { constants } from '../../../constants/constants'
import { endPoints } from '../../../constants/endPoints'
import { remember } from '../../../helpers/actorMemory'
import { callAnApi } from '../../../helpers/callApi'
import { configs } from '../../../helpers/configs'
import { finishTest } from '../../../helpers/finishTest'

export const backendVersion = {
    to : async () => {

        const elapseTime = await callAnApi(
            Send.a(
                GetRequest.to(endPoints.backendVersion)
                .using({timeout : constants.apiDefaultTimeOut, headers : configs.apiDefaultHeaders })                
            ),
        )

        await remember(actorMemories.timeResponse, elapseTime)

        return await finishTest()
    }
}