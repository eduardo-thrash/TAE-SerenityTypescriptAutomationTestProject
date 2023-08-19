import { actorInTheSpotlight,Duration } from '@serenity-js/core'
import { isVisible,Wait } from '@serenity-js/webdriverio'

import { constants } from '../../constants/constants'
import { click, scrollToPosition } from '../../helpers/actions'
import { resolve } from '../../helpers/element'
import { catalogUI } from '../../ui/mobile/catalog'

export const brandsAndProducts = {

    to: async () => {
        await actorInTheSpotlight().attemptsTo(
            Wait.for(Duration.ofSeconds(2))
        )
        const size = await driver.getWindowSize()
        const from = await resolve(catalogUI.liquorCategory())
        await scrollToPosition(from, 0,size.height*1.75,'bottom'),
    
        await actorInTheSpotlight().attemptsTo( 

            Wait.for(Duration.ofSeconds(5)),

            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
        .until(catalogUI.labelBrandsForYou(), isVisible()),               
            await click(catalogUI.labelBrandsForYou()),  
        
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
        .until(catalogUI.accessoriesBrands(), isVisible()),
        
            Wait.for(Duration.ofSeconds(3)),

            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
        .until(catalogUI.drinksBrands(), isVisible()),               
            await click(catalogUI.drinksBrands()),  

            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
        .until(catalogUI.hitsBrands(), isVisible()),
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
        .until(catalogUI.frutinoBrands(), isVisible()),  
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
        .until(catalogUI.cocacolaBrands(), isVisible()),  
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
        .until(catalogUI.speedmaxBrands(), isVisible()),     
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
        .until(catalogUI.quatroBrands(), isVisible()), 
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
        .until(catalogUI.sporadeBrands(), isVisible()),    
        
            await click(catalogUI.hitsBrands()), 
        
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
        .until(catalogUI.drinkHit(), isVisible()),
        
        )
    }
}