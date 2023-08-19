import { Activity, actorInTheSpotlight } from '@serenity-js/core';
import { performance } from 'perf_hooks';

import { actorMemories } from '../constants/actorMemories';
import { remember } from './actorMemory';

export const callAnApi = async (request: Activity) => {
    const startTime = performance.now()
    await actorInTheSpotlight().attemptsTo(
        request
    )
    const endTime= performance.now()
    await remember(actorMemories.timeResponse, endTime - startTime)
}