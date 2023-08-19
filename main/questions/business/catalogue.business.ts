import { actorInTheSpotlight, Log, TestCompromisedError } from '@serenity-js/core';

import { BrandsAdsSectionResponse } from '../../dtos/catalogue/AvailableInventoryForBrandsAdsSectionResponse';
import { BannersSectionResponseList } from '../../dtos/catalogue/BannersSectionResponse';
import { DayOfferSectionResponse } from '../../dtos/catalogue/DayOfferSectionResponse';
import { DiscountsSectionResponse } from '../../dtos/catalogue/DiscountsSectionResponse';
import { FavoritesSectionResponse } from '../../dtos/catalogue/FavoritesSectionResponse';
import { MacroCategoriesSectionResponse } from '../../dtos/catalogue/MacroCategoriesSectionResponse';
import { NewReferencesSectionResponse } from '../../dtos/catalogue/NewReferencesSectionResponse';
import { OffertsContentSectionResponse } from '../../dtos/catalogue/OffertsContentSectionResponse';
import { SubcategoryResponse } from '../../dtos/catalogue/SubcategoryResponse';
import { TopForYouSectionResponse } from '../../dtos/catalogue/TopForYouSectionResponse';
import { TopSellerSectionResponse } from '../../dtos/catalogue/TopSellerSectionResponse';
import { UnbeatableSectionResponse } from '../../dtos/catalogue/UnbeatableSectionResponse';
import { catalogue } from '../catalogue/catalogue';

export const catalogueBusiness = {

    getSectionsByTable: async (ecommerceHomeSections : { section: string; message: string }[], idToken: string, storeId: number, warehouseIds: any, locationId : any, latitude: any, longitude: any, userId: string): Promise<Map<string, object>> => {
        const ecommerceHomeSectionMap = new Map<string, object>();

        let brandsAdsSectionResponse: BrandsAdsSectionResponse;
        let bannersSectionResponseList: BannersSectionResponseList;
        let dayOfferSectionResponse : DayOfferSectionResponse;
        let discountsSectionResponse : DiscountsSectionResponse;
        let favoritesSectionResponse : FavoritesSectionResponse;
        let macroCategoriesSectionResponse: MacroCategoriesSectionResponse;
        let newReferencesSectionResponse : NewReferencesSectionResponse;
        let offersContentSectionResponse : OffertsContentSectionResponse[];
        let topForYouSectionResponse : TopForYouSectionResponse;
        let topSellerSectionResponse : TopSellerSectionResponse;
        let unbeatableSectionResponse : UnbeatableSectionResponse;
    
        for (const section of ecommerceHomeSections) {
            switch (section.section) {
                case 'Banners':
                    bannersSectionResponseList = await catalogue.getCategorizedBannersSection(idToken, '2',warehouseIds, locationId, storeId.toString());
                    ecommerceHomeSectionMap.set('Banners', bannersSectionResponseList);
                    break;
                case 'Macro-Categorias':
                    macroCategoriesSectionResponse = await catalogue.getMacrocategoryAvailableInventorySection(idToken, storeId.toString(), warehouseIds, locationId, 'es', 'true', 'false', latitude, longitude);
                    ecommerceHomeSectionMap.set('Macro-Categorias', macroCategoriesSectionResponse);
                    break;
                case 'Reorder home':
                    Log.the('no se ejecuta en la app un endpoint para Reorder Home').performAs(actorInTheSpotlight())
                    break;
                case 'Ofertas':
                    offersContentSectionResponse = await catalogue.getOffersContentSection(idToken, locationId, userId, '1', '10', warehouseIds);
                    ecommerceHomeSectionMap.set('Ofertas', offersContentSectionResponse);
                    break;
                case 'Oferta del día':
                    dayOfferSectionResponse = await catalogue.getAvailableInventoryForDayOfferSection(idToken, warehouseIds, locationId);
                    ecommerceHomeSectionMap.set('Oferta del día', dayOfferSectionResponse);
                    break;
                case 'Descuentos':
                    discountsSectionResponse = await catalogue.getDiscountedAvailableInventorySection(idToken, warehouseIds, locationId);
                    ecommerceHomeSectionMap.set('Descuentos', discountsSectionResponse);
                    break;
                case 'Para ti':
                    topForYouSectionResponse = await catalogue.getAvailableInventoryTopForYouSection(idToken, storeId.toString(), locationId);
                    ecommerceHomeSectionMap.set('Para ti', topForYouSectionResponse);
                    break;
                case 'Marcas':      
                    brandsAdsSectionResponse = await catalogue.getAvailableInventoryForBrandsAdsSection(idToken, storeId.toString(), warehouseIds, locationId);
                    ecommerceHomeSectionMap.set('Marcas', brandsAdsSectionResponse);
                    break;
                case 'Mas vendidos':
                    topSellerSectionResponse = await catalogue.getTopSellingAvailableInventorySection(idToken, storeId.toString());
                    ecommerceHomeSectionMap.set('Mas vendidos', topSellerSectionResponse);
                    break;
                case 'Insuperables':
                    unbeatableSectionResponse = await catalogue.getUnbeatableInventorySection(idToken, storeId.toString(), warehouseIds, locationId);
                    ecommerceHomeSectionMap.set('Insuperables', unbeatableSectionResponse);
                    break;
                case 'Descubre':
                    newReferencesSectionResponse = await catalogue.getAvailableInventorySectionWithNewReferences(idToken, storeId.toString(), warehouseIds, locationId);
                    ecommerceHomeSectionMap.set('Descubre', newReferencesSectionResponse);
                    break;
                case 'Favoritos':
                    favoritesSectionResponse = await catalogue.getFavoritesSection(idToken, storeId.toString(), warehouseIds, locationId);
                    ecommerceHomeSectionMap.set('Favoritos', favoritesSectionResponse);
                    break;
                default:
                    throw new TestCompromisedError(`The section "${section.section}" hasn't implementation due to business definition failure`)
            }
        }

        return ecommerceHomeSectionMap;
    },

    getSubcategories: async (idToken: string, storeId: string, macroCategoryList: MacroCategoriesSectionResponse, warehouseIds: any, locationId: any, latitude: string, longitude: string): Promise<SubcategoryResponse[]> => {

        const subcategoriesList: SubcategoryResponse[] = [];

        for (const macroCategory of macroCategoryList.avaibleStock){
            const macroCategoryId : number = macroCategory.id

            const subcategoriesResponse : SubcategoryResponse[] = await actorInTheSpotlight().answer(
                await catalogue.getSubcategoriesByMacrocategory(idToken, storeId.toString(), macroCategoryId.toString(), warehouseIds, locationId, latitude, longitude)
            )

            console.log('Macrocategoria: '+ macroCategoryId + ' con nombre: ' + macroCategory.name)
            subcategoriesResponse.forEach((subcategory: SubcategoryResponse) => {
                subcategoriesList.push(subcategory);
            });
        }
        
        return subcategoriesList
    }
}