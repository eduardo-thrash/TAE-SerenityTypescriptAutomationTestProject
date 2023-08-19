import { by, Target } from '@serenity-js/webdriverio';

export const catalogUI = {        
    catalogCustomerAddress: () =>
        Target.the('Customer Delivery Address').located(by.xpath("(//*[@index='2'])[2]")),

    catalogBanners: () =>
        Target.the('Section Banners').located(by.xpath('(//android.widget.ImageView)[1]')),
    
    catalogBannersEndsInText: () =>
        Target.the('Banner text ends in').located(by.xpath('(//android.view.ViewGroup[8]//android.widget.ImageView)[1]')),
        
    catalogProductsBanners: () => 
        Target.the('Products banners').located(by.xpath('//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[2]')),

    catalogMacrocategoriesLiqueurs: () =>
        Target.the('Section macrocategorie liqueurs').located(by.xpath("(//*[@index='0'][1])[57]")),
     
    catalogMacrocategoriesLiqueursText: () =>
        Target.the('Section macrocategorie liqueurs text').located(by.xpath('(//*[@content-desc="catalogDashboard"]//android.widget.TextView[1])[3]')),

    catalogMacrocategoriesPersonalCare: () =>
        Target.the('Section macrocategorie personal care').located(by.xpath("(//*[@index='0'][1])[57]")),    

    catalogMacrocategoriesPersonalCareText: () =>
        Target.the('Section macrocategorie personal care text').located(by.xpath('(//*[@content-desc="catalogDashboard"]//android.view.ViewGroup[2]//android.widget.TextView[1])[7]')),                    

    catalogCombosAndOffers: () =>
        Target.the('Section combos and offers').located(by.xpath('(//*[@content-desc="catalogDashboard"]//android.view.ViewGroup[2]//android.view.ViewGroup[2])[7]')),

    catalogCardCombosAndOffers: () => 
        Target.the('Card combo and offer').located(by.xpath("(//*[@index='0'])[42]")),    

    catalogDiscounts: () =>
        Target.the('Section discounts').located(by.xpath('//android.widget.ScrollView[@content-desc="catalogDashboard"]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup')),

    catalogInternalAddQuantityButton: () =>
        Target.the('Internal add product quantity button').located(by.xpath('//*[@content-desc="catalogInternalAddQuantityButton"]')),
    
    catalogInternalAddProductButton: () =>
        Target.the('Internal add product to car button').located(by.xpath('//*[@content-desc="catalogInternalAddToCarButton"]')),
        
    catalogCarTabText: () =>
        Target.the('Car Tab with products').located(by.xpath('(//*[@content-desc="catalogCarTab"])[2]')),
    
    catalogCarTab: () =>
        Target.the('Car Tab').located(by.xpath('//*[@content-desc="catalogCarTab"]')),
    
    //@xpath
    catalogHomePriceToolTipText: () =>
        Target.the('Price tool tip text on dash board').located(by.xpath("//*[starts-with(@text, '¡')]")),

    catalogTest: () =>
        Target.the('catalog test').located(by.xpath('//android.widget.FrameLayout//android.view.ViewGroup[3]/android.widget.TextView')),

    catalogHomePriceToolTip: () =>
        Target.the('Price tool tip on dash board').located(by.xpath("(//*[@index='0'][1])[112]")),
    
    catalogAddProductExternalCard: () =>
        Target.the('Add products button from external card + ').located(by.xpath('//*[@content-desc="productCardActionButtonSection"]')),

    catalogIncreaseProductExternalCard: () =>
        Target.the('Add products button from external card ').located(by.xpath('//*[@resource-id="productActionsButtonAdd"]*')),

    catalogDeleteProductExternalCard: () =>
        Target.the('Add products button from external card ').located(by.xpath('//*[@resource-id="productActionsButtonTrashOrMinus"]*')),
        
    catalogSectionBanners: (id: number) =>
        Target.the(`Section Banners ${id}`).located(by.xpath(`//*[@content-desc="catalogSectionBanners${id}"]/*`)),

    catalogInternalCardProductImage: () =>
        Target.the('internal card product image').located(by.xpath('//*[@content-desc="catalogInternalImage0"]/*')),

    catalogInternalCardProductPrice: () =>
        Target.the('internal card product price').located(by.xpath('//android.widget.TextView[@content-desc="catalogProductMainPriceText"]')),

    catalogInternalCardProductName: () =>
        Target.the('Internal card Product Name').located(by.xpath('(//*[@content-desc="catalogInternalCard"])[1]//android.widget.TextView[3]')),

    catalogInternalCardAddQuantityButton: () =>
        Target.the('Add Quantity button').located(by.xpath('//*[@content-desc="catalogInternalAddQuantityButton"]/*')),

    catalogIconBackArrow: () =>
        Target.the('Icon Back Arrow').located(by.xpath("(//*[@index='0'])[32]")),
        
    catalogInternalCardTrashOrMinusButton: () =>
        Target.the('Trash or minus button').located(by.xpath('//*[@content-desc="catalogInternalTrashOrMinusQuantityButton"]/*')),
    
    catalogInternalCardTotalPrice: () =>
        Target.the('Total product Price').located(by.xpath('//*[@content-desc="catalogInternalAddToCarButton"]/android.widget.TextView[2]')),

    catalogInternalCarTab: () =>
        Target.the('Car Tab with quantity').located(by.xpath('(//*[@content-desc="catalogCarTab"])[2]')),
        
    catalogInternalCarTabItem: () =>
        Target.the('Item internal card').located(by.xpath('//*[@resource-id="catalogInternalCard"]')),

    catalogInternalCardAmmountText: () =>
        Target.the('pvp ammount text').located(by.xpath('//*[@content-desc="catalogInternalPvpAmmountText"]')),

    catalogInternalCardEarningsText: () =>
        Target.the('pvp earnings text').located(by.xpath('//*[@content-desc="catalogInternalPvpEarningsText"]')),

    catalogInternalCardTotalAmmount: () =>
        Target.the('Text Ammount Total').located(by.xpath('//*[@content-desc="catalogInternalTotalAmmountText"]')),
        
    catalogInternalCardEditText: () =>
        Target.the('card internal quantity items text field').located(by.xpath('//*[@content-desc="catalogInternalCard"]//android.widget.EditText')),

    catalogInternalProductImage: () =>
        Target.the('card internal product image').located(by.xpath('(//*[@content-desc="catalogInternalCard"]//android.widget.ImageView)[1]')),
        
    //@xpath
    catalogStoreHomeButton: () =>
        Target.the('Store button in dashboard page').located(by.xpath('(//*[@index="0")[89]')),

    //@xpath
    catalogDiscountExcedeedAlert: () =>
        Target.the('alert notification when excedeed discount quantity in internal card').located(by.xpath('//*[contains(@text, "Descuento con tope")]')),
    
    //@xpath
    catalogDiscountExcedeedDismissButtonAlert: () =>
        Target.the('button to dismiss the alert notification when excedeed discount quantity').located(by.xpath('//*[contains(@text, "Entendido")]')),
    
    catalogProductCaterogyCard: () => 
        Target.the('product card from category').located(by.xpath('(//*[@content-desc="CatalogProductCardImage"])[4]')),
    catalogOrderHistoryDashBoard: () =>
        Target.the('Slide to view the order history on home page').located(by.xpath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[7]/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.widget.HorizontalScrollView/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup')),

    //macroCategories
    liquorCategory: () =>
        Target.the('liquor categorie').located(by.xpath('//*[contains(@text, "Licores")]')),
    aguardienteSubCategory: () =>
        Target.the('aguardiente sub categorie').located(by.xpath('(//*[@index="0"])[45]')),
    drinksCategory: () =>
        Target.the('drinks categorie').located(by.xpath('//*[contains(@text, "Bebidas no alcohólicas")]')),
    sodasSubCategory: () =>
        Target.the('sodas sub categorie').located(by.xpath('(//*[@index="0"])[45]')),
    candyCategory: () =>
        Target.the('candy categorie').located(by.xpath('//*[contains(@text, "Dulces y pasabocas")]')),
    chocoSubCategory: () =>
        Target.the('chocolate sub categorie').located(by.xpath('(//*[@index="0"])[45]')),
    homeCategory: () =>
        Target.the('home categorie').located(by.xpath('//*[contains(@text, "Cuidado del hogar")]')),
    bleachSubCategory: () =>
        Target.the('bleach sub categorie').located(by.xpath('(//*[@index="0"])[45]')),
    clothesCategory: () =>
        Target.the('clothes categorie').located(by.xpath('//*[contains(@text, "Cuidado de la ropa")]')),
    clothesBleachSubCategory: () =>
        Target.the('clothes bleach sub categorie').located(by.xpath('(//*[@index="0"])[45]')),
    personalcareCategory: () =>
        Target.the('personal care categorie').located(by.xpath('//*[contains(@text, "Cuidado personal")]')),     
    paperSubCategory: () =>
        Target.the('paper sub categorie').located(by.xpath('(//*[@index="0"])[45]')), 
    backButton: () =>
        Target.the('back button').located(by.xpath('(//*[@index="0"])[32]')),

    //brands
    labelBrandsForYou: () =>
        Target.the('label of brands').located(by.xpath('//*[contains(@text, "Ver las")]')),
    accessoriesBrands: () =>
        Target.the('accessories brands').located(by.xpath('(//*[contains(@text, "Accesorios")])[1]')),
    drinksBrands: () =>
        Target.the('drinks brands').located(by.xpath('(//*[contains(@text, "Bebidas")])[1]')),
    hitsBrands: () =>
        Target.the('hit brands').located(by.xpath('(//*[@index="0"])[69]')),
    frutinoBrands: () =>
        Target.the('frutino brands').located(by.xpath('(//*[@index="0"])[72]')),
    cocacolaBrands: () =>
        Target.the('coca cola brands').located(by.xpath('(//*[@index="0"])[75]')),
    speedmaxBrands: () =>
        Target.the('speedmax brands').located(by.xpath('(//*[@index="0"])[87]')),
    quatroBrands: () =>
        Target.the('quatro brands').located(by.xpath('(//*[@index="0"])[90]')),
    sporadeBrands: () =>
        Target.the('sporade brands').located(by.xpath('(//*[@index="0"])[93]')),
    drinkHit: () =>
        Target.the('hit product').located(by.xpath('(//*[contains(@text, "Hit")])[1]')),

    helpPointMessageButtonClose: () =>
        Target.the('helpPoint close button').located(by.xpath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[1]/android.view.ViewGroup')),        

}