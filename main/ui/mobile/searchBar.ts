import { by, Target } from '@serenity-js/webdriverio';

export const searchBarUi = {
    autocomplete: () =>
        Target.the('Autocomplete words').located(by.xpath('(//*[@resource-id="autoCompleteItem"])[1]')),
    headerResultSearch: () =>
        Target.the('header result search count').located(by.id('headerResultCount')),    
    productName: () =>
        Target.the('Name product external card').located(by.xpath('(//android.view.ViewGroup[@content-desc="catalogExternalCard"])[1]//android.widget.TextView[3]')),                  
    productNameAutocomplete: () =>
        Target.the('Name product autocomplete search').located(by.xpath('(//*[@resource-id="autoCompleteItem"])[1]//android.widget.TextView[1]')),                  
    searchBarBanner: () =>
        Target.the('search bar banner').located(by.xpath('//*[@content-desc="SearchBarField"]')),
    searchBarField: () =>
        Target.the('search bar input text').located(by.xpath('//*[@content-desc="SearchBarTextInput"]')),
    searchBarResultItem: (index: number) => 
        Target.the(`search bar suggestion number ${index + 1} in the list`).located(by.xpath(`//*[@content-desc="searchBarResult${index}"]`)),
    searchBarHelpPoint: () =>
        Target.the('search bar filter help point').located(by.xpath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[3]/android.view.ViewGroup[2]/android.view.ViewGroup')),
    searchBarCloseFiltersPopUp: () =>
        Target.the('search bar close filters pop up').located(by.xpath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[3]/android.view.ViewGroup[2]/android.view.ViewGroup')),
    searchBarCleanButton: () =>
        Target.the('option to clean search bar').located(by.xpath('//android.view.ViewGroup[@content-desc="SearchBarCleanButton"]/android.view.ViewGroup')),
    searchBarRecentSearchesList: (index: number) =>
        Target.the('search bar recent searches showed').located(by.xpath(`//android.view.ViewGroup[@content-desc="SearchBarRecentItem${index}"]`)),
    searchBarRecentItem: (index: number) => 
        Target.the(`search bar recent searches ${index + 1} in the list`).located(by.xpath(`//*[@content-desc="SearchBarRecentItem${index}"]`)),
    searchBarDeleteRecentItem: (index: number) =>
        Target.the(`search bar delete the recent searches ${index} in the list`).located(by.xpath(`//*[@content-desc="searchBarRecentList"]/android.view.ViewGroup[${index}]/android.view.ViewGroup[2]/*`)),
    searchBarCloseOrderByPopUp: () =>
        Target.the('search bar close filters pop up').located(by.xpath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[3]/android.view.ViewGroup[2]/android.view.ViewGroup')),
    searchBarCloseEditRecentSearchesPopUp: () =>
        Target.the('search bar close recent se pop up').located(by.xpath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup[2]/android.view.ViewGroup')),
    searchBarCloseOrderByRecommendedPopUp: () =>
        Target.the('search bar close order by recommended pop up').located(by.xpath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[3]/android.view.ViewGroup[2]/android.view.ViewGroup')),    
    searchBarInputDashboard: () =>        
        Target.the('input search dashboard').located(by.xpath("(//*[@index='0'])[34]")), 
    searchBarInputEnterValue: () => 
        Target.the('enter product input').located(by.xpath('//*[@resource-id="searchBarInput"]')),
    closeTooltipButton: () =>
        Target.the('close tool tip autocomplete search').located(by.xpath('//*[@resource-id="closeTooltipButton"]')),
    searchBarAutoCompleteResult: (index= 7) => 
        Target.the('enter product input').located(by.xpath(`(//*[@resource-id="autoCompleteItem"])[${index}]`)),
        searchBarTF: () =>
        Target.the('input text field in search bar').located(by.xpath('//*[contains(@text, "Busca productos")]')),
    searchBarInputTextField: () =>
        Target.the('input text field in search bar').located(by.xpath('(//*[@index="1"])[6]'))     

}