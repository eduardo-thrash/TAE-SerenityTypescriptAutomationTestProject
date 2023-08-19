import { actorInTheSpotlight } from '@serenity-js/core';
import { GetRequest, LastResponse, Send } from '@serenity-js/rest';

import { constants } from '../../constants/constants';
import { endPoints } from '../../constants/endPoints';
import { httpCodes } from '../../constants/httpCodes';
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
import { apiAsserts } from '../../helpers/apiAsserts';
import { callAnApi } from '../../helpers/callApi';
import { configs } from '../../helpers/configs';

export const catalogue = {

    getCategorizedBannersSection: async (idToken: string, categoryId: string, warehouseIds : any, locationId: any, storeId : string): Promise<BannersSectionResponseList> => {
        
        await callAnApi(
            Send.a(
                GetRequest.to(endPoints.categorizedBannersSection
                    .replace('{{categoryId}}', categoryId)
                    .replace('{{warehouseIds}}', '[{{warehouseIdsl}}]'.replace('{{warehouseIdsl}}', String(warehouseIds)))
                    .replace('{{locationId}}', locationId)
                    .replace('{{store_id}}', storeId))
                    .using({ 
                        timeout: constants.apiDefaultTimeOut, 
                        headers: { 
                            authorization: `Bearer ${idToken}`,
                            ...configs.apiDefaultHeaders
                        }
                    })
            )
        );

        await apiAsserts.successResponse(httpCodes.OK)

        const bannersSectionResponseList : BannersSectionResponseList = await actorInTheSpotlight().answer(LastResponse.body<BannersSectionResponseList>())

        return bannersSectionResponseList
    },

    getMacrocategoryAvailableInventorySection: async (idToken: string, storeId : string, warehouseIds : any, locationId: any, lng : string, dashboard: string, hideCigarettes: string, latitude: string, longitude: string ): Promise<MacroCategoriesSectionResponse> => {
        
        await callAnApi(
            Send.a(
                GetRequest.to(endPoints.macroCategoriesSection
                    .replace('{{store_id}}', storeId)
                    .replace('{{warehouseIds}}', '[{{warehouseIdsl}}]'.replace('{{warehouseIdsl}}', String(warehouseIds)))
                    .replace('{{locationId}}', locationId)
                    .replace('{{lng}}', lng)
                    .replace('{{dashboard}}', dashboard)
                    .replace('{{hideCigarettes}}', hideCigarettes)
                    .replace('{{lat}}', latitude)
                    .replace('{{long}}', longitude)
                    .replace('{{newHome}}', 'true'))
                    .using({ 
                        timeout: constants.apiDefaultTimeOut, 
                        headers: { 
                            authorization: `Bearer ${idToken}`,
                            ...configs.apiDefaultHeaders
                        }
                    })
            )
        );

        await apiAsserts.successResponse(httpCodes.OK)

        const macroCategoriesSectionResponse : MacroCategoriesSectionResponse = await actorInTheSpotlight().answer(LastResponse.body<MacroCategoriesSectionResponse>())

        return macroCategoriesSectionResponse
    },

    getDiscountedAvailableInventorySection: async (idToken: string, warehouseIds: any, locationId: any): Promise<DiscountsSectionResponse> => {

        const lng = 'es';

        await callAnApi(
            Send.a(
                GetRequest.to(endPoints.discountedSection
                    .replace('{{warehouseIds}}', `[${String(warehouseIds)}]`)
                    .replace('{{locationId}}', String(locationId))
                    .replace('{{lng}}', lng))
                    .using({ 
                        timeout: constants.apiDefaultTimeOut, 
                        headers: { 
                            authorization: `Bearer ${idToken}`,
                            ...configs.apiDefaultHeaders
                        }
                    })
            )
        );

        await apiAsserts.successResponse(httpCodes.OK)

        const discountsSectionResponse : DiscountsSectionResponse = await actorInTheSpotlight().answer(LastResponse.body<DiscountsSectionResponse>())

        return discountsSectionResponse
    },

    getAvailableInventoryTopForYouSection: async (idToken: string, storeId : string, locationId: any): Promise<TopForYouSectionResponse> => {
        
        const lng = 'es';

        await callAnApi(
            Send.a(
                GetRequest.to(endPoints.topForYouSection
                    .replace('{{store_id}}', storeId)
                    .replace('{{lng}}', lng)
                    .replace('{{locationId}}', String(locationId)))
                    .using({ 
                        timeout: constants.apiDefaultTimeOut,
                        headers: { 
                            authorization: `Bearer ${idToken}`,
                            ...configs.apiDefaultHeaders
                        }
                    })
            )
        );

        await apiAsserts.successResponse(httpCodes.OK)

        const topForYouSectionResponse : TopForYouSectionResponse = await actorInTheSpotlight().answer(LastResponse.body<TopForYouSectionResponse>())

        return topForYouSectionResponse
    },

    getTopSellingAvailableInventorySection: async (idToken: string, storeId : string): Promise<TopSellerSectionResponse> => {

        const lng = 'es';

        await callAnApi(
            Send.a(
                GetRequest.to(endPoints.topSellerSection
                    .replace('{{store_id}}', storeId)
                    .replace('{{lng}}', lng))
                    .using({ 
                        timeout: constants.apiDefaultTimeOut,
                        headers: { 
                            authorization: `Bearer ${idToken}`,
                            ...configs.apiDefaultHeaders
                        }
                    })
            )
        );

        await apiAsserts.successResponse(httpCodes.OK)

        const topSellerSectionResponse : TopSellerSectionResponse = await actorInTheSpotlight().answer(LastResponse.body<TopSellerSectionResponse>())

        return topSellerSectionResponse;
    },

    getUnbeatableInventorySection: async (idToken: string, storeId : string, warehouseIds: any, locationId: any): Promise<UnbeatableSectionResponse> => {

        const lng = 'es';

        await callAnApi(
            Send.a(
                GetRequest.to(endPoints.unbeatableSection
                    .replace('{{store_id}}', storeId)
                    .replace('{{warehouseIds}}', `[${String(warehouseIds)}]`)
                    .replace('{{locationId}}', locationId)
                    .replace('{{lng}}', lng))
                    .using({ 
                        timeout: constants.apiDefaultTimeOut,
                        headers: { 
                            authorization: `Bearer ${idToken}`,
                            ...configs.apiDefaultHeaders
                        }
                    })
            )
        );

        await apiAsserts.successResponse(httpCodes.OK)

        const unbeatableSectionResponse : UnbeatableSectionResponse = await actorInTheSpotlight().answer(LastResponse.body<UnbeatableSectionResponse>())

        return unbeatableSectionResponse;
    },

    getAvailableInventorySectionWithNewReferences: async (idToken: string, storeId : string, warehouseIds: any, locationId: any): Promise<NewReferencesSectionResponse> => {
        
        const lng = 'es';

        await callAnApi(
            Send.a(
                GetRequest.to(endPoints.newReferencesSection
                    .replace('{{store_id}}', storeId)
                    .replace('{{warehouseIds}}', `[${String(warehouseIds)}]`)    
                    .replace('{{locationId}}', locationId)
                    .replace('{{lng}}', lng))
                    .using({ 
                        timeout: constants.apiDefaultTimeOut,
                        headers: { 
                            authorization: `Bearer ${idToken}`,
                            ...configs.apiDefaultHeaders
                        }
                    })
            )
        );

        await apiAsserts.successResponse(httpCodes.OK)

        const newReferencesSectionResponse : NewReferencesSectionResponse = await actorInTheSpotlight().answer(LastResponse.body<NewReferencesSectionResponse>())

        return newReferencesSectionResponse;
    },

    getAvailableInventoryForDayOfferSection: async (idToken: string, warehouseIds: any, locationId: any): Promise<DayOfferSectionResponse> => {

        const lng = 'es';

        await callAnApi(
            Send.a(
                GetRequest.to(endPoints.dayOffertSection
                    .replace('{{warehouseIds}}', `[${String(warehouseIds)}]`)
                    .replace('{{locationId}}', String(locationId))
                    .replace('{{lng}}', lng))
                    .using({ 
                        timeout: constants.apiDefaultTimeOut,
                        headers: { 
                            authorization: `Bearer ${idToken}`,
                            ...configs.apiDefaultHeaders
                        }
                    })
            )
        );

        await apiAsserts.successResponse(httpCodes.OK)

        const dayOfferSectionResponse : DayOfferSectionResponse = await actorInTheSpotlight().answer(LastResponse.body<DayOfferSectionResponse>())

        return dayOfferSectionResponse
    },

    getAvailableInventoryForBrandsAdsSection: async (idToken: string, storeId: string, warehouseIds: any, locationId: any): Promise<BrandsAdsSectionResponse> => {

        const limit = '6';
        const lng = 'es';

        await callAnApi(
            Send.a(
                GetRequest.to(endPoints.availableInventoryBrandsAds
                    .replace('{{store_id}}', storeId)
                    .replace('{{limit}}', limit)
                    .replace('{{warehouseIds}}', '[{{warehouseIdsl}}]'.replace('{{warehouseIdsl}}', String(warehouseIds)))
                    .replace('{{locationId}}', String(locationId))
                    .replace('{{lng}}', lng))

                    .using({ 
                        timeout: constants.apiDefaultTimeOut, 
                        headers: { 
                            authorization: `Bearer ${idToken}`,
                            ...configs.apiDefaultHeaders
                        } 
                    })
            )
        );

        await apiAsserts.successResponse(httpCodes.OK)

        const brandsAdsSectionResponse : BrandsAdsSectionResponse = await actorInTheSpotlight().answer(LastResponse.body<BrandsAdsSectionResponse>())

        return brandsAdsSectionResponse
    },

    getOffersContentSection: async (idToken: string, locationId: any, userId: string, page: string, perPage: string, warehouseIds: any): Promise<OffertsContentSectionResponse[]> => {

        const lng = 'es';
        
        await callAnApi(
            Send.a(
                GetRequest.to(endPoints.offersContentSection
                    .replace('{{locationId}}', locationId)
                    .replace('{{userId}}', userId)
                    .replace('{{page}}', page)
                    .replace('{{perPage}}', perPage)
                    .replace('{{warehouseId}}', `[${String(warehouseIds)}]`)
                    .replace('{{lng}}', lng))
                    .using({
                        timeout: constants.apiDefaultTimeOut,
                        headers: {
                            authorization: `Bearer ${idToken}`,
                            ...configs.apiDefaultHeaders
                        }
                    })
            )
        );

        await apiAsserts.successResponse(httpCodes.OK)

        const offertsContentSectionResponse : OffertsContentSectionResponse[] = await actorInTheSpotlight().answer(LastResponse.body<OffertsContentSectionResponse[]>())

        return offertsContentSectionResponse
    },

    getFavoritesSection: async (idToken: string, storeId: string, warehouseIds: any, locationId: any): Promise<FavoritesSectionResponse> => {

        const numberOrders = '3';
        const lng = 'es';
        
        await callAnApi(
            Send.a(
                GetRequest.to(endPoints.favoritesSection
                    .replace('{{store_id}}', storeId)
                    .replace('{{numOrders}}', numberOrders)
                    .replace('{{warehouseIds}}', `[${String(warehouseIds)}]`)
                    .replace('{{locationId}}', locationId)
                    .replace('{{lng}}', lng))
                    .using({
                        timeout: constants.apiDefaultTimeOut,
                        headers: {
                            authorization: `Bearer ${idToken}`,
                            ...configs.apiDefaultHeaders
                        }
                    })
            )
        );

        await apiAsserts.successResponse(httpCodes.OK)

        const favoritesSectionResponse : FavoritesSectionResponse = await actorInTheSpotlight().answer(LastResponse.body<FavoritesSectionResponse>())

        return favoritesSectionResponse
    },

    getSubcategoriesByMacrocategory: async (idToken: string, storeId: string, macrocategoryId : string, warehouseIds: any, locationId: any, latitude: string, longitude: string): Promise<SubcategoryResponse[]> => {
        
        const hideCigarettes = 'false';
        
        await callAnApi(
            Send.a(
                GetRequest.to(endPoints.subcategoriesByMacrotegory
                    .replace('{{store_id}}', storeId)
                    .replace('{{macros}}', macrocategoryId)
                    .replace('{{warehouseIds}}', `[${String(warehouseIds)}]`)
                    .replace('{{locationId}}', locationId)
                    .replace('{{hideCigarettes}}', hideCigarettes)
                    .replace('{{lat}}', latitude)
                    .replace('{{long}}', longitude))
                    .using({
                        timeout: constants.apiDefaultTimeOut,
                        headers: {
                            authorization: `Bearer ${idToken}`,
                            ...configs.apiDefaultHeaders
                        }
                    })
            )
        );
        
        await apiAsserts.successResponse(httpCodes.OK)

        const subcategoriesResponse : SubcategoryResponse[] = await actorInTheSpotlight().answer(LastResponse.body<SubcategoryResponse[]>())

        return subcategoriesResponse
    }
}