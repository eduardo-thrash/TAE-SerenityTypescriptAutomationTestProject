import { TestCompromisedError } from '@serenity-js/core';

import { BrandsAdsSectionResponse } from '../../../dtos/catalogue/AvailableInventoryForBrandsAdsSectionResponse';
import { BannersSectionResponseList } from '../../../dtos/catalogue/BannersSectionResponse';
import { DayOfferSectionResponse } from '../../../dtos/catalogue/DayOfferSectionResponse';
import { DiscountsSectionResponse } from '../../../dtos/catalogue/DiscountsSectionResponse';
import { FavoritesSectionResponse } from '../../../dtos/catalogue/FavoritesSectionResponse';
import { AvaibleStock, MacroCategoriesSectionResponse } from '../../../dtos/catalogue/MacroCategoriesSectionResponse';
import { NewReferencesSectionResponse } from '../../../dtos/catalogue/NewReferencesSectionResponse';
import { OffertsContentSectionResponse } from '../../../dtos/catalogue/OffertsContentSectionResponse';
import { TopForYouSectionResponse } from '../../../dtos/catalogue/TopForYouSectionResponse';
import { TopSellerSectionResponse } from '../../../dtos/catalogue/TopSellerSectionResponse';
import { UnbeatableSectionResponse } from '../../../dtos/catalogue/UnbeatableSectionResponse';
import { Ensure } from '../../../questions/Ensure';

export const validateCatalogue = {

    byHomeSection: async (ecommerceSections: Map<string, object>, ecommerceHomeSections: { section: string; message: string }[]) => {

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
                    bannersSectionResponseList = ecommerceSections.get('Banners') as BannersSectionResponseList;
                    fromBanners(bannersSectionResponseList)
                    break;
                case 'Macro-Categorias':
                    macroCategoriesSectionResponse = ecommerceSections.get('Macro-Categorias') as MacroCategoriesSectionResponse;
                    fromMacrocategories(macroCategoriesSectionResponse)
                    break;
                case 'Reorder home':
                    console.log('no se ejecuta en la app un endpoint para Reorder Home');
                    break;
                case 'Ofertas':
                    offersContentSectionResponse = ecommerceSections.get('Ofertas') as OffertsContentSectionResponse[];
                    fromOffers(offersContentSectionResponse)     
                    break;
                case 'Oferta del día':
                    dayOfferSectionResponse = ecommerceSections.get('Ofertas') as DayOfferSectionResponse;
                    fromDayOffer(dayOfferSectionResponse)
                    break;
                case 'Descuentos':
                    discountsSectionResponse = ecommerceSections.get('Descuentos') as DiscountsSectionResponse;
                    fromDiscount(discountsSectionResponse);
                    break;
                case 'Para ti':
                    topForYouSectionResponse = ecommerceSections.get('Para ti') as TopForYouSectionResponse;
                    fromTopForYou(topForYouSectionResponse);
                    break;
                case 'Marcas':      
                    brandsAdsSectionResponse = ecommerceSections.get('Marcas') as BrandsAdsSectionResponse;
                    fromBrands(brandsAdsSectionResponse);
                    break;
                case 'Mas vendidos':
                    topSellerSectionResponse = ecommerceSections.get('Mas vendidos') as TopSellerSectionResponse;
                    fromTopSeller(topSellerSectionResponse);
                    break;
                case 'Insuperables':
                    unbeatableSectionResponse = ecommerceSections.get('Insuperables') as UnbeatableSectionResponse;
                    fromUnbeatable(unbeatableSectionResponse);
                    break;
                case 'Descubre':
                    newReferencesSectionResponse = ecommerceSections.get('Descubre') as NewReferencesSectionResponse;
                    fromNewReferences(newReferencesSectionResponse);
                    break;
                case 'Favoritos':
                    favoritesSectionResponse = ecommerceSections.get('Favoritos') as FavoritesSectionResponse;
                    fromFavorites(favoritesSectionResponse);
                    break;
                default:
                    throw new TestCompromisedError(`Home section "${section.section}" without implementation due to business definition failure`)
            }
        }
    }
}

function fromMacrocategories(macroCategoriesSectionResponse: MacroCategoriesSectionResponse) {
    const productsQuantity : AvaibleStock[] = macroCategoriesSectionResponse.avaibleStock.filter(s => s.countProducts > 0);
    const pngUrlOrThumb : AvaibleStock[] = macroCategoriesSectionResponse.avaibleStock.filter(s => s.pngUrl != undefined || s.pngUrl != '' || s.thumb != undefined || s.thumb != '');
    const subCategoriesList : AvaibleStock[] = macroCategoriesSectionResponse.avaibleStock.filter(s => s.subCategories.length > 0);
    
    Ensure.that.isEqualTo(productsQuantity.length === macroCategoriesSectionResponse.avaibleStock.length, true, `La sección de Macrocategorias retorna ${macroCategoriesSectionResponse.avaibleStock.length} categorias correctamente.` , 'Error => en Sección de Macrocategorias ya que no retorna categorias.')
    Ensure.that.isEqualTo(pngUrlOrThumb.length === macroCategoriesSectionResponse.avaibleStock.length, true, `Todas las Macrocategorias retornan sus imagenes principales en los atributos "pngUrl" y "Thumb".`, `Error => Existen Macrocategorias sin imagen principal en atributo "pngUrl" o "Thumb"`)
    Ensure.that.isEqualTo(subCategoriesList.length === macroCategoriesSectionResponse.avaibleStock.length, true, 'Todas las macrocategorias retornan 1 o más subcategorias.', 'Error => Existen Macrocategorias que no retornan subcategorias.')
}

function fromBanners(bannersSectionResponseList: BannersSectionResponseList) {
    const totalBanners : boolean = bannersSectionResponseList.length > 0 ? true : false;
    const productsWithBannerImage = bannersSectionResponseList.filter(s => s.imageURL);
    const productsWithExternalLink = bannersSectionResponseList.filter(s => s.externalLink);

    if(totalBanners){
        Ensure.that.isEqualTo(totalBanners, true, `Se obtuvo ${bannersSectionResponseList.length} banner(s).`, 'Error => No se retornan banners.')
    }else{
        Ensure.that.isEqualTo(totalBanners, false, `No se obtuvo banner(s), pero no se considera error.`, 'Error => No se retornan banners.')
    }

    Ensure.that.isEqualTo(productsWithBannerImage.length === bannersSectionResponseList.length, true, `Todas los Banners contienen imagenes`, `Error => Existen Banners sin imagenes.`)
    Ensure.that.isEqualTo(productsWithExternalLink.length === bannersSectionResponseList.length, true, `Todas los Banners contienen external link.`, `Error => Existen Banners sin external link.`)
}

function fromOffers(offersContentSectionResponse : OffertsContentSectionResponse[]){
    const principalOffers = offersContentSectionResponse.length;
    const productsWithTitleFromOffersSection = offersContentSectionResponse.filter(s => s.title);
    const productsWithDescriptionFromOffersSection = offersContentSectionResponse.filter(s => s.description);
    const productsWithImageFromOffersSection = offersContentSectionResponse.filter(s => s.defaultMedia.url);

    Ensure.that.isEqualTo(principalOffers > 0, true, `La sección de Ofertas retorna ${principalOffers} ofertas principales.` , 'Error => La Sección de Ofertas no retorna resultados principales.')
    Ensure.that.isEqualTo(productsWithTitleFromOffersSection.length === offersContentSectionResponse.length, true, `Todas las ofertas contienen Titulo.` , 'Error => Existen ofertas que no retornan titulo.')
    Ensure.that.isEqualTo(productsWithDescriptionFromOffersSection.length === offersContentSectionResponse.length, true, `Todas las ofertas contienen descripción.` , 'Error => Existen ofertas que no retornan descripción.')
    Ensure.that.isEqualTo(productsWithImageFromOffersSection.length === offersContentSectionResponse.length, true, `Todas las ofertas contienen imagen.` , 'Error => Existen ofertas que no retornan imagen.')
}

function fromDayOffer(dayOfferSectionResponse : DayOfferSectionResponse){
    const dayOfferCount : boolean = dayOfferSectionResponse.totalCount > 0 ? true : false;
    if(dayOfferCount){
        Ensure.that.isEqualTo(dayOfferCount, true, `Se obtuvo ${dayOfferSectionResponse.totalCount} oferta(s) del día.`, 'Error => No se retorna ofertas del día.')
    }else{
        Ensure.that.isEqualTo(dayOfferCount, false, `No se obtienen ofertas del día, pero no se considera error.`, 'Error => No se esperan ofertas del día, sin embargo el endpoint available-inventory/day-offer retorna resultados.')
    }
}

function fromDiscount(discountsSectionResponse : DiscountsSectionResponse){
    const principalDiscounts = discountsSectionResponse.avaibleStock.length;
    const totalDiscounts = discountsSectionResponse.totalCount;
    const productsWithDiscountDescription = discountsSectionResponse.avaibleStock.filter(s => s.description);
    const productsWithdiscountPercentage = discountsSectionResponse.avaibleStock.filter(s => s.discount);

    Ensure.that.isEqualTo(principalDiscounts > 0, true, `La sección de Descuentos retorna ${principalDiscounts} productos principales.` , 'Error => La Sección de Descuentos no retorna resultados principales.')
    Ensure.that.isEqualTo(totalDiscounts > 0, true, `La sección de Descuentos retorna ${totalDiscounts} productos en total.` , 'Error => La Sección de Descuentos no retorna resultados.')
    Ensure.that.isEqualTo(productsWithDiscountDescription.length === discountsSectionResponse.avaibleStock.length, true, `Todos los productos principales de la sección de Descuentos contienen descripción.` , 'Error => Existen productos principales en la sección de descuentos sin descripción.')
    Ensure.that.isEqualTo(productsWithdiscountPercentage.length === discountsSectionResponse.avaibleStock.length, true, `Todos los productos principales de la sección de Descuentos contienen información de descuento.` , 'Error => Existen productos principales en la sección de Descuentos sin información de descuento.')
}

function fromTopForYou(topForYouSectionResponse : TopForYouSectionResponse){
    const totalProductsFromTopForYouSection = topForYouSectionResponse.totalCount;
    const principalProductsFromTopForYouSection = topForYouSectionResponse.avaibleStock.length
    const productsWithNameFromTopForYouSection = topForYouSectionResponse.avaibleStock.filter(s => s.name);
    
    Ensure.that.isEqualTo(principalProductsFromTopForYouSection > 0, true, `La sección de Top for You retorna ${principalProductsFromTopForYouSection} productos principales.` , 'Error => La Sección de Top for you no retorna resultados principales.')
    Ensure.that.isEqualTo(totalProductsFromTopForYouSection > 0, true, `La sección de Descuentos retorna ${totalProductsFromTopForYouSection} productos en total.` , 'Error => La Sección de Top for you no retorna resultados.')
    Ensure.that.isEqualTo(productsWithNameFromTopForYouSection.length === topForYouSectionResponse.avaibleStock.length, true, `Todos los productos principales de la sección de Top for you contienen información de nombre.` , 'Error => Existen productos principales en la sección de Top for you sin información de nombre.')
}

function fromBrands(brandsAdsSectionResponse: BrandsAdsSectionResponse){
    const totalProductsFromBrandSection = brandsAdsSectionResponse.totalCount;
    const totalBrands = brandsAdsSectionResponse.brandAds.length;
    const brandsWithProductList = brandsAdsSectionResponse.brandAds.filter(s => s.productList.length > 0)

    Ensure.that.isEqualTo(totalBrands > 0, true, `La sección de Marcas retorna ${totalBrands} marcas patrocinadas.` , 'Error => La Sección de Marcas no retorna resultados.')
    Ensure.that.isEqualTo(totalProductsFromBrandSection > 0, true, `La sección de Marcas retorna ${totalProductsFromBrandSection} productos en total.` , 'Error => La Sección de Marcas no retorna resultados.')
    Ensure.that.isEqualTo(brandsWithProductList.length === brandsAdsSectionResponse.brandAds.length, true, `Todas las marcas contienen listado de productos.` , 'Error => Existen marcas sin listado de productos')
}

function fromFavorites(favoritesSectionResponse: FavoritesSectionResponse){
    const totalProductsFromFavoritesSection = favoritesSectionResponse.totalCount;
    const principalProductsFromFavoritesSection = favoritesSectionResponse.avaibleStock.length;

    Ensure.that.isEqualTo(totalProductsFromFavoritesSection > 0, true, `La sección de Favoritos retorna ${totalProductsFromFavoritesSection} productos totales.` , 'Error => La sección de Favoritos no retorna resultados.')
    Ensure.that.isEqualTo(principalProductsFromFavoritesSection > 0, true, `La sección de Favoritos retorna correctamente ${principalProductsFromFavoritesSection} productos principales` , 'Error => La sección de Favoritos no retorna resultados.')
}

function fromTopSeller(topSellerSectionResponse : TopSellerSectionResponse){
    const totalProductsFromTopSellerSection = topSellerSectionResponse.totalCount;
    const principalProductsFromTopSellerSection = topSellerSectionResponse.avaibleStock.length
    
    Ensure.that.isEqualTo(totalProductsFromTopSellerSection > 0, true, `La sección de Top Seller retorna ${totalProductsFromTopSellerSection} productos totales.` , 'Error => La sección de Top Seller no retorna resultados.')
    Ensure.that.isEqualTo(principalProductsFromTopSellerSection > 0, true, `La sección de Top Seller retorna correctamente ${principalProductsFromTopSellerSection} productos principales` , 'Error => La sección de Top Seller no retorna resultados.')
}

function fromUnbeatable(unbeatableSectionResponse : UnbeatableSectionResponse){
    const totalProductsFromUnbeatableSection = unbeatableSectionResponse.totalCount;
    const principalProductsFromUnbeatableSection = unbeatableSectionResponse.avaibleStock.length
    
    Ensure.that.isEqualTo(totalProductsFromUnbeatableSection > 0, true, `La sección de Insuperables retorna ${totalProductsFromUnbeatableSection} productos totales.` , 'Error => La sección de Insuperables no retorna resultados.')
    Ensure.that.isEqualTo(principalProductsFromUnbeatableSection > 0, true, `La sección de Insuperables retorna correctamente ${principalProductsFromUnbeatableSection} productos principales` , 'Error => La sección de Insuperables no retorna resultados.')
}

function fromNewReferences(newReferencesSectionResponse : NewReferencesSectionResponse){
    const totalProductsFromNewReferencesSection = newReferencesSectionResponse.totalCount;
    const principalProductsFromNewReferencesSection = newReferencesSectionResponse.avaibleStock.length
    
    Ensure.that.isEqualTo(totalProductsFromNewReferencesSection > 0, true, `La sección de Nuevas referencias retorna ${totalProductsFromNewReferencesSection} productos totales.` , 'Error => La sección de Nuevas referencias no retorna resultados.')
    Ensure.that.isEqualTo(principalProductsFromNewReferencesSection > 0, true, `La sección de Nuevas referencias retorna correctamente ${principalProductsFromNewReferencesSection} productos principales` , 'Error => La sección de Nuevas referencias no retorna resultados.')
}
