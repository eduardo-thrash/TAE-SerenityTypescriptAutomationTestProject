import { Ensure, equals, startsWith } from '@serenity-js/assertions';
import { actorInTheSpotlight,Check, Duration, TestCompromisedError } from '@serenity-js/core';
import { isVisible,Wait } from '@serenity-js/webdriverio';

import { actorMemories } from '../../constants/actorMemories';
import { constants } from '../../constants/constants';
import { click } from '../../helpers/actions';
import { recall } from '../../helpers/actorMemory';
import { sections } from '../../helpers/sections';
import { getTextByElement } from '../../helpers/text';
import { catalogUI } from '../../ui/mobile/catalog';
import { onboardingUI } from '../../ui/mobile/onboarding';

export const catalog = {
    check: async () => {
        try{
            await actorInTheSpotlight().attemptsTo(
                Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
                .until(catalogUI.catalogHomePriceToolTipText(), isVisible()),   
                Check.whether(await getTextByElement(catalogUI.catalogHomePriceToolTipText()), startsWith('¡'))
                .andIfSo(                    
                    await click(catalogUI.catalogHomePriceToolTip())        
                ))
        } catch{
            await actorInTheSpotlight().attemptsTo(
                Ensure.that(onboardingUI.profileButton(), isVisible())
                .otherwiseFailWith(TestCompromisedError, 'The profile Button is not visible'),
            )
        } 
                  
    },

    checkSections: async (sectionType : string ) => { 
        switch (sectionType) {
            case 'banners': {
                await sections.sectionBanners();
            
                break;
            }
            case 'macro-categories': {
                await sections.sectionMacrocategories();
            
                break;
            }
            case 'combos and offers': {
                await sections.sectionCombosAndOffers();
            
                break;
            }
            default: {
                console.log('No se encontró la opción');
            }
        } 
    },
    
    accessSections: async() => {
        const sectionBanner = await recall(actorMemories.sectionBannerAccess)
        const sectionCombosAndOffers = await recall(actorMemories.sectionCombosAndOffersAccess)
        await actorInTheSpotlight().attemptsTo(
            Ensure.that(sectionBanner, equals(true).describedAs('Successfully access to the banner section'))
            .otherwiseFailWith(TestCompromisedError, 'The banner section could not be accessed'),
            Ensure.that(sectionCombosAndOffers, equals(true).describedAs('Successfully access to the combos and offers section'))
            .otherwiseFailWith(TestCompromisedError, 'The combos and offerss section could not be accessed'),
        )
    },

    checkSectionBanner: async() => {
        await sections.sectionBanners()        
    },

    checkProductsBanner: async() => {
        await actorInTheSpotlight().attemptsTo(
            Wait.upTo(Duration.ofSeconds(constants.ElementDefaultTimeOuts))
            .until(catalogUI.catalogProductsBanners(), isVisible()),
            Ensure.that(catalogUI.catalogProductsBanners(), isVisible())
                .otherwiseFailWith(TestCompromisedError, 'The profile Button is not visible'),
        )
        
    }

}