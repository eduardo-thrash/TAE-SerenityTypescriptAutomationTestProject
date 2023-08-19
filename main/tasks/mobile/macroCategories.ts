import { actorInTheSpotlight,Duration } from '@serenity-js/core'
import { isVisible,Wait } from '@serenity-js/webdriverio'

import { constants } from '../../constants/constants'
import { click, scrollToPosition } from '../../helpers/actions'
import { resolve } from '../../helpers/element'
import { catalogUI } from '../../ui/mobile/catalog'

export const macroCategories = {

    to: async () => {
        const size = await driver.getWindowSize()
        const from = await resolve(catalogUI.liquorCategory())
        await scrollToPosition(from, 0,(size.height)/6,'bottom'),
    
        await actorInTheSpotlight().attemptsTo( 

            Wait.for(Duration.ofSeconds(5)),

            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
        .until(catalogUI.liquorCategory(), isVisible()),               
            await click(catalogUI.liquorCategory()),
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
        .until(catalogUI.aguardienteSubCategory(), isVisible()), 
        
            await click(catalogUI.backButton()),

            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
        .until(catalogUI.drinksCategory(), isVisible()),               
            await click(catalogUI.drinksCategory()),
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
        .until(catalogUI.sodasSubCategory(), isVisible()), 

            await click(catalogUI.backButton()),

            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
        .until(catalogUI.candyCategory(), isVisible()),               
            await click(catalogUI.candyCategory()),
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
        .until(catalogUI.chocoSubCategory(), isVisible()), 

            await click(catalogUI.backButton()),

            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
        .until(catalogUI.homeCategory(), isVisible()),               
            await click(catalogUI.homeCategory()),
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
        .until(catalogUI.bleachSubCategory(), isVisible()), 
 
            await click(catalogUI.backButton()),
 
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
        .until(catalogUI.clothesCategory(), isVisible()),               
            await click(catalogUI.clothesCategory()),
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
        .until(catalogUI.clothesBleachSubCategory(), isVisible()), 
 
            await click(catalogUI.backButton()),
 
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
        .until(catalogUI.personalcareCategory(), isVisible()),               
            await click(catalogUI.personalcareCategory()),
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
        .until(catalogUI.paperSubCategory(), isVisible()), 
 
            await click(catalogUI.backButton()),
        
        )
    }
}