import { actorInTheSpotlight } from '@serenity-js/core'
import { LastResponse, PostRequest, Send } from '@serenity-js/rest'

import { constants } from '../../../constants/constants'
import { endPoints } from '../../../constants/endPoints'
import { httpCodes } from '../../../constants/httpCodes'
import { AutocompletePayload } from '../../../dtos/search/autocompletePayload'
import { AutocompleteResponse } from '../../../dtos/search/autocompleteResponse'
import { AutocompleteBuilder, SearchBuilder } from '../../../dtos/search/builders/searchBuilder'
import { SearchPayload } from '../../../dtos/search/searchPayload'
import { SearchResponse } from '../../../dtos/search/searchResponse'
import { apiAsserts } from '../../../helpers/apiAsserts'
import { callAnApi } from '../../../helpers/callApi'
import { configs } from '../../../helpers/configs'

export const searchProduct = {
    with : async(product : string, storeId: number, warehouseId: number[], locationId: number) : Promise<AutocompleteResponse> => {

        const autocompletePayload: AutocompletePayload = AutocompleteBuilder(product, locationId, process.env.SESSION_ID, storeId, warehouseId)

        await callAnApi(
            Send.a(
                PostRequest.to(endPoints.autocompleteHost)
                    .with(JSON.stringify(autocompletePayload))
                    .using({ timeout: constants.apiDefaultTimeOut, headers: { Authorization: process.env.AUTHORIZATION_SEARCH, ...configs.apiDefaultHeaders } }),
            )
        )

        await apiAsserts.successResponse(httpCodes.OK)

        const autocompleteResponse: AutocompleteResponse = await actorInTheSpotlight().answer(LastResponse.body<AutocompleteResponse>())

        return autocompleteResponse
    },
    using : async(product : string, storeId: number, warehouseIds: number[], locationId: number) : Promise<SearchResponse> => {
        
        const searchPayload : SearchPayload = SearchBuilder(locationId, product, constants.queryTypeInsert, process.env.SEARCH_ID, process.env.SESSION_ID, storeId, warehouseIds, constants.searchVersion)

        await callAnApi(
            Send.a(
                PostRequest.to(endPoints.searchHost)
                    .with(JSON.stringify(searchPayload))
                    .using({ timeout: constants.apiDefaultTimeOut, headers: { Authorization: process.env.AUTHORIZATION_SEARCH, ...configs.apiDefaultHeaders } }),
            )
        )

        await apiAsserts.successResponse(httpCodes.OK)

        const searchResponse: SearchResponse = await actorInTheSpotlight().answer(LastResponse.body<SearchResponse>())

        return searchResponse
    }
}