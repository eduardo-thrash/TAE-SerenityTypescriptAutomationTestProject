import { Ensure, equals, isGreaterThan } from '@serenity-js/assertions'
import { actorInTheSpotlight,TestCompromisedError } from '@serenity-js/core'

import { AutocompleteResponse } from '../../../dtos/search/autocompleteResponse'
import { HitsResult, SearchResponse } from '../../../dtos/search/searchResponse'

export const validateSearch = {

    checkAutocompleteResult: async(product : string, autocompleteResponse : AutocompleteResponse) => { 
        await actorInTheSpotlight().attemptsTo(
            Ensure.that(autocompleteResponse.keywordsHit.length, isGreaterThan(0))
                .otherwiseFailWith(TestCompromisedError, `There are not keyboard hits in autocomplete list for '${product}'. This list is empty!`),
            Ensure.that(autocompleteResponse.metadataPricing.length, isGreaterThan(0))
                .otherwiseFailWith(TestCompromisedError, `There are not pricing for products in autocomplete list for '${product}'. This list is empty!`)
        )
    },

    checkEmptyAutocompleteResult: async(product : string, autocompleteResponse: AutocompleteResponse) => {
        await actorInTheSpotlight().attemptsTo(
            Ensure.that(autocompleteResponse.keywordsHit.length, equals(0))
                .otherwiseFailWith(TestCompromisedError, `There are at least one keyboard hits in autocomplete list for '${product}`)
        )
    },

    checkSearchResult: async(product : string, searchResponse : SearchResponse) => {
        const hitsFound : HitsResult[] = searchResponse.hits.filter(item => 
            item.name.toLowerCase().includes(product.toLowerCase())
        )

        await actorInTheSpotlight().attemptsTo(
            Ensure.that(hitsFound.length, isGreaterThan(0))
                .otherwiseFailWith(TestCompromisedError, `There is at least one product that contains ${product}`)
        )
    },

    checkEmptySearchResult: async(product : string, searchResponse : SearchResponse) => {
        const hitsFound : HitsResult[] = searchResponse.hits.filter(item => 
            item.name.toLowerCase().includes(product.toLowerCase())
        )

        await actorInTheSpotlight().attemptsTo(
            Ensure.that(searchResponse.hits.length, isGreaterThan(0))
                .otherwiseFailWith(TestCompromisedError, 'There are not suggestion hits to show'),
            Ensure.that(hitsFound.length, equals(0))
                .otherwiseFailWith(TestCompromisedError, `There is at least one product that contains ${product}`)
        )
    }
}