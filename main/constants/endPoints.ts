import * as dotenv from 'dotenv'
dotenv.config()

export const endPoints = {
    
    //Onboarding
    backendVersion : 'https://staging.lb-api.chiper.co/store/backend-version?version=v10',
    businessTypes : 'https://staging.api.chiper.co/ms-user/store/business-types?lng=es',
    documentsToAccept : 'https://staging.api.chiper.co/ms-user/user/documents-to-accept/{{country_id}}',
    getAccountInfo: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=${process.env.GOOGLE_API_KEY}`,
    getMacroCategoriesByCountryId: 'https://staging.api.chiper.co/ms-user/macro-category/by-country-id/{{country_id}}?lng=es',
    getShoppingCartInfo : 'https://staging.chiper-cart.chiper.co/api/v3/cart/{{store_id}}?lng=es',
    hasCoverage : 'https://staging.lb-api.chiper.co/store/has-coverage',
    isNewUser: 'https://staging.api.chiper.co/authenticator-api/authentication/phone-number-check?phoneCode={{phone_code}}&phoneNumber={{phone}}',
    minOrderValues: 'https://staging.lb-api.chiper.co/store/min-order-values?storeId={{store_id}}',
    msUser : 'https://staging.api.chiper.co/ms-user/user/get-user-info/{{local_id}}?lng=es',
    sendOtp : 'https://staging.api.chiper.co/authenticator-api/authentication/otp',
    startSignUp : 'https://staging.api.chiper.co/ms-user/user/start-signup?lng=es',
    verifyCustomToken: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${process.env.GOOGLE_API_KEY}`,    
    
    //Catalogue
    availableInventoryBrandsAds : 'https://staging.catalogue.chiper.co/store/{{store_id}}/available-inventory/brands-ads?limit={{limit}}&warehouseIds={{warehouseIds}}&locationId={{locationId}}&lng={{lng}}',
    categorizedBannersSection : 'https://staging.catalogue.chiper.co/dashboard/categorized-banners?categoryId={{categoryId}}&warehouseIds={{warehouseIds}}&locationId={{locationId}}&storeId={{store_id}}',
    dayOffertSection : 'https://staging.catalogue.chiper.co/store/223751/available-inventory/day-offer?warehouseIds={{warehouseIds}}&locationId={{locationId}}&lng={{lng}}',
    discountedSection : 'https://staging.catalogue.chiper.co/store/223751/available-inventory/discounted?warehouseIds={{warehouseIds}}&locationId={{locationId}}&lng={{lng}}',
    favoritesSection : 'https://staging.catalogue.chiper.co/store/{{store_id}}/favorites?numOrders={{numOrders}}&warehouseIds={{warehouseIds}}&locationId={{locationId}}&lng={{lng}}',
    macroCategoriesSection : 'https://staging.catalogue.chiper.co/store/{{store_id}}/available-inventory/macros?warehouseIds={{warehouseIds}}&locationId={{locationId}}&lng={{lng}}&dashboard={{dashboard}}&hideCigarettes={{hideCigarettes}}&lat={{lat}}&long={{long}}&newHome={{newHome}}',
    newReferencesSection : 'https://staging.catalogue.chiper.co/store/{{store_id}}/available-inventory/new-references?warehouseIds={{warehouseIds}}&locationId={{locationId}}&lng={{lng}}',
    offersContentSection : 'https://staging.api.chiper.co/community-api/api/v1/content?locationId={{locationId}}&userId={{userId}}&page={{page}}&perPage={{perPage}}&warehouseId={{warehouseId}}&lng={{lng}}',
    topForYouSection : 'https://staging.catalogue.chiper.co/store/{{store_id}}/available-inventory/top-for-you?lng={{lng}}&locationId={{locationId}}',
    topSellerSection : 'https://staging.catalogue.chiper.co/store/{{store_id}}/available-inventory/top-seller?lng={{lng}}',
    unbeatableSection : 'https://staging.catalogue.chiper.co/store/{{store_id}}/available-inventory/unbeatable?warehouseIds={{warehouseIds}}&locationId={{locationId}}&lng={{lng}}',
    subcategoriesByMacrotegory : 'https://catalogue.chiper.co/store/{{store_id}}/macros/{{macros}}/subcategories?warehouseIds={{warehouseIds}}&locationId={{locationId}}&hideCigarettes={{hideCigarettes}}&lat={{lat}}&long={{long}}',

    //Checkout
    addressData: 'https://staging.lb-api.chiper.co/checkout/{{store_id}}/address?lng=es-CO',
    addItemsToShoppingCar : 'https://staging.chiper-cart.chiper.co/api/v3/cart/{{store_id}}/items?lng=es',
    checkShoppingCarStatus: 'https://staging.chiper-cart.chiper.co/api/v3/cart/{{store_id}}/status?lng=es',
    checkout : 'https://staging.lb-api.chiper.co/store/{{store_id}}/order-checkout-data-v3?lng=es-CO',
    newOrderTracking : 'https://staging.lb-api.chiper.co/store/new-order-tracking/{{order_id}}',
    orderTracking : 'https://staging.api.chiper.co/order-tracking-api/store/{{store_id}}/order/{{order_id}}',
    getShoppingCarDetails: 'https://staging.chiper-cart.chiper.co/api/v3/cart/{{store_id}}?lng=es',
    purchases : 'https://staging.checkout.chiper.co/stores/{{store_id}}/purchases?lng=es-CO',
    orderCheckoutData: 'https://staging.lb-api.chiper.co/store/{{store_id}}/order-checkout-data-v3?lng=es-CO',
    processing : 'https://staging.checkout.chiper.co/stores/{{store_id}}/purchases/{{purchase_uid}}/processing/last?lng=es-CO',
    
    //Search
    autocompleteHost : 'https://staging.search-bar.chiper.co/autocomplete',
    searchHost : 'https://staging.catalogue.chiper.co/search?skip=0&limit=30',

    //Shopping
    deleteShoppingCart : 'https://staging.chiper-cart.chiper.co/api/v3/cart/{{store_id}}?lng=es',
    shoppingCart : 'https://staging.chiper-cart.chiper.co/api/v3/cart/{{store_id}}/items?lng=es',
    quantity : 'https://staging.chiper-cart.chiper.co/api/v3/cart/{{store_id}}/items/{{product_id}}/quantity?lng=es',

    //Common vivo
    availableProducts : 'https://staging.api.chiper.co/vivo/inventory/products?page=1&limit=300',    
    vivoLogin : '/vivo/auth/user-authorization/login'
}