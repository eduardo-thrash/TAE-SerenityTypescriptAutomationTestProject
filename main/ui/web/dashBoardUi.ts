import { by, Target } from '@serenity-js/webdriverio';

export const dashBoardUi = {
    
    closeWelcomeToolTip: () =>
        Target.the('close welcome tooltip').located(by.id('close')),
    SearchBarInput: () =>
        Target.the('SearchBar input in dashboard page').located(by.id('searchHeaderInput')),
    currentAddress: () =>
        Target.the('The current addres in dashBoard').located(by.xpath("//button[@class='animated_containerAddress__3arhL']")),
    categoriesContainer: () =>
        Target.the('The all categories container').located(by.xpath('#shopContainer div>div')),
    storeHomeButton: () =>
        Target.the('Store Home button').located(by.xpath("//div[@id='homeFooter']")),
    priceHomeButton: () =>
        Target.the('Price home button').located(by.xpath("//div[@id='PriceComparison']")),
    accountHomeButton: () =>
        Target.the('Account home button').located(by.xpath("//div[@id='accountFooter']")),
    carHomeButton: () =>
        Target.the('Car home button').located(by.xpath("//p[@data-testid='cartCounter']"))
}