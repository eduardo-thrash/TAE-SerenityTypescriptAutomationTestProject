import { GetRequest, Send } from '@serenity-js/rest'

import { actorMemories } from '../../../constants/actorMemories'
import { constants } from '../../../constants/constants'
import { endPoints } from '../../../constants/endPoints'
import { recall, remember } from '../../../helpers/actorMemory'
import { callAnApi } from '../../../helpers/callApi'
import { configs } from '../../../helpers/configs'
import { finishTest } from '../../../helpers/finishTest'

export const processing = {
    to : async () => {
        const elapseTime = await callAnApi(
            Send.a(
                GetRequest.to(endPoints.processing.replace('{{store_id}}', await recall(actorMemories.storeId)).replace('{{purchase_uid}}', await recall(actorMemories.purchaseUid)))
                .using({timeout : constants.apiDefaultTimeOut, headers : configs.apiDefaultHeaders})
            )
        )

        await remember(actorMemories.timeResponse, elapseTime)

        return finishTest()
    }
}