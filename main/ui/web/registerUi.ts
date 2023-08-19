import { by, Target } from '@serenity-js/webdriverio';

export const registerUi = {
    
    registerFirstNameInput: () =>
        Target.the('Enter first name input').located(by.id('inputFirstName')),

    registerLastNameInput: () =>
        Target.the('Enter last name input').located(by.id('inputLastName')),

    registerStoreNameInput: () =>
        Target.the('Enter store name input').located(by.id('inputStoreName')),

    termsAndConditionsCheckbox: () =>
        Target.the('Select terms and conditions checkbox').located(by.xpath("//span[@class='Checkbox_customBlackCheck__2anur']")),

    personalDataCheckbox: () =>
        Target.the('Select personal data checkbox').located(by.xpath("//body/div[@id='root']/div[2]/form[1]/div[5]/label[1]/span[1]")),

    finishRegisterButton: () =>
        Target.the('Finish register process button').located(by.xpath("//button[contains(text(),'Terminar Registro')]")),

    registerAddressInput: () =>
        Target.the('enter the address').located(by.xpath("//input[@placeholder='Escribe tu dirección']")),

    resultRegisterAddressInput: () =>
        Target.the('Select the first address option').located(by.xpath("//div[@class='pac-item px-30px']")),

    confirmRegisterAddressInput: () =>
        Target.the('confirm if address is correct').located(by.xpath("//button[@class='Buttons_button__2SH40 Buttons_primary__2DKhx  w-12 h-12 ']")),

    aditionalAddressIndicationsInput: () =>
        Target.the('text field to put aditiona address information').located(by.xpath("//textarea[@class='line-clamp-3 md:line-clamp-none TextArea_textFieldInput__3JuEL ']")),

    completeRegisterButton: () =>
        Target.the('complete register buton').located(by.xpath("//button[@class='Buttons_button__2SH40 Buttons_primary__2DKhx  w-12 h-12 ']")),
}
