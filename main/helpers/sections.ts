import { Ensure, equals} from '@serenity-js/assertions'
import { actorInTheSpotlight,Duration, TestCompromisedError } from '@serenity-js/core'
import { isVisible,Wait } from '@serenity-js/webdriverio'

import { actorMemories } from '../constants/actorMemories'
import { constants } from '../constants/constants'
import { catalogUI } from '../ui/mobile/catalog'
import { click, scrollToPosition } from './actions'
import { remember } from './actorMemory'
import { resolve } from './element'
import { getTextByElement } from './text'

export const sections = {
    sectionBanners: async () => {       
        await actorInTheSpotlight().attemptsTo(
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
            .until(catalogUI.catalogBanners(), isVisible()),

            Ensure.that(catalogUI.catalogBanners(), isVisible())
           .otherwiseFailWith(TestCompromisedError, 'The banner section is not visible'),
            await click(catalogUI.catalogBanners()),
            
            Ensure.that(catalogUI.catalogBannersEndsInText(), isVisible())
            .otherwiseFailWith(TestCompromisedError, 'The banner is not visible'),
            Wait.for(Duration.ofSeconds(5)),
            Ensure.that(catalogUI.catalogBannersEndsInText(), isVisible())
             .otherwiseFailWith(TestCompromisedError, `The banner does not contain the word`),
        )
        const accessToBannerSection = Ensure.that(catalogUI.catalogBannersEndsInText(), isVisible()) ? true : console.log('It was not possible to access banners section')
        
        await remember(actorMemories.sectionBannerAccess, accessToBannerSection)
    },

    sectionMacrocategories: async () => {
        const size = await driver.getWindowSize()         
        await actorInTheSpotlight().attemptsTo(
            await click(catalogUI.catalogIconBackArrow()),
            Wait.for(Duration.ofSeconds(3)),
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
            .until(catalogUI.catalogMacrocategoriesLiqueurs(), isVisible()),

            Ensure.that(catalogUI.catalogMacrocategoriesLiqueurs(), isVisible())
            .otherwiseFailWith(TestCompromisedError, 'The macrocategories liqueurs section is not visible'),
            Ensure.that(await getTextByElement(catalogUI.catalogMacrocategoriesLiqueursText()), equals('Licores'))
             .otherwiseFailWith(TestCompromisedError, `The macrocategorie does not contain the word`),            
        )

        const from = await resolve(catalogUI.catalogBanners())
        await scrollToPosition(from, 0, (size.width)/2, 'bottom')

        await actorInTheSpotlight().attemptsTo(
            Ensure.that(catalogUI.catalogMacrocategoriesPersonalCare(), isVisible())
            .otherwiseFailWith(TestCompromisedError, 'The macrocategories personal care section is not visible'),
            Ensure.that(await getTextByElement(catalogUI.catalogMacrocategoriesPersonalCareText()), equals('Cuidado personal'))
             .otherwiseFailWith(TestCompromisedError, `The macrocategorie does not contain the word`),
        )
    },

    sectionCombosAndOffers: async () => {     
        const size = await driver.getWindowSize()   
        const from = await resolve(catalogUI.catalogBanners())
        await scrollToPosition(from, 0, (size.width)/2, 'bottom')
        await actorInTheSpotlight().attemptsTo(
            Ensure.that(catalogUI.catalogCombosAndOffers(), isVisible())
           .otherwiseFailWith(TestCompromisedError, 'The combos and offers section is not visible'),
            await click(catalogUI.catalogCombosAndOffers()),
            Wait.for(Duration.ofSeconds(4))
        )
        const result2 = Ensure.that(catalogUI.catalogCombosAndOffers(), isVisible()) ? true : console.log('It was not possible to access the combos and offers section')
        
        await remember(actorMemories.sectionCombosAndOffersAccess, result2)

        await actorInTheSpotlight().attemptsTo(
            await click(catalogUI.catalogIconBackArrow())            
        )
    }
} 