import { Ensure, startsWith } from '@serenity-js/assertions'
import { actorInTheSpotlight, Check, Duration, TestCompromisedError} from '@serenity-js/core'
import { isVisible,Wait } from '@serenity-js/webdriverio'

import { constants } from '../../constants/constants'
import { keycodes } from '../../constants/keycodes'
import { click, enterValue} from '../../helpers/actions'
import { getTextByElement } from '../../helpers/text'
import { catalogUI } from '../../ui/mobile/catalog'
import { searchBarUi } from '../../ui/mobile/searchBar'

export const searchBar = {
    byProductName: async (productName : string) => {
        await actorInTheSpotlight().attemptsTo( 
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
            .until(searchBarUi.searchBarInputDashboard(), isVisible()),               
            await click(searchBarUi.searchBarInputDashboard()),                                      
            await enterValue(searchBarUi.searchBarInputEnterValue(), productName),                                        
        )
        const searchBarInputText = await searchBarUi.searchBarInputEnterValue().answeredBy(actorInTheSpotlight())
        await searchBarInputText.pressKeyCode(keycodes.ENTER)        
    },

    checkResults: async (productName : string) => {
        const searchBarInputText = await searchBarUi.searchBarInputEnterValue().answeredBy(actorInTheSpotlight())
        await searchBarInputText.pressKeyCode(keycodes.ENTER)
        await actorInTheSpotlight().attemptsTo(
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
            .until(searchBarUi.productName(), isVisible()),
            Ensure.that(await getTextByElement(searchBarUi.productName()), startsWith(productName))
                .otherwiseFailWith(TestCompromisedError, `The results does not contain the word ${productName}`)
        )
    },

    checkAutocompleteResult: async (productName : string) =>  {
        await actorInTheSpotlight().attemptsTo(
            Check.whether(searchBarUi.closeTooltipButton(), isVisible())
                    .andIfSo(await click(searchBarUi.closeTooltipButton())),

            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
                    .until(searchBarUi.autocomplete(), isVisible()), 
            Ensure.that(searchBarUi.autocomplete(), isVisible())
                    .otherwiseFailWith(TestCompromisedError, `The product whisky does not get autocomplete results`),

            Ensure.that(await getTextByElement(searchBarUi.productNameAutocomplete()), startsWith(productName))
                    .otherwiseFailWith(TestCompromisedError, `The results does not contain the word ${productName}`),
        
            await click(searchBarUi.autocomplete())
        )

        await actorInTheSpotlight().attemptsTo(
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
                .until(catalogUI.catalogInternalCarTabItem(), isVisible()),

            Ensure.that(await getTextByElement(catalogUI.catalogInternalCardProductName()), startsWith(productName))
                    .otherwiseFailWith(TestCompromisedError, `The results does not contain the word ${productName}`)
        )
    }    
}                           