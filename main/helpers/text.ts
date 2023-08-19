import { actorInTheSpotlight, Answerable } from '@serenity-js/core';
import { Text } from '@serenity-js/webdriverio';

export const getTextByElement = async (element : Answerable<ElementSync>) => {
    return await actorInTheSpotlight().answer(Text.of(element))
}