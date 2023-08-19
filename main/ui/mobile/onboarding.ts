import { by, Target } from '@serenity-js/webdriverio';

export const onboardingUI = {
    //@xpath
    accountButton: () =>
        Target.the('account button').located(by.xpath('(//*[@index="3"])[6]')),
    //@xpath    
    accountDeliveryDataButton: () =>
        Target.the('account delivery data button').located(by.xpath('//android.widget.ScrollView//android.view.ViewGroup[6]/android.view.ViewGroup')),
    //@xpath    
    accountInfoHeader: () =>
        Target.the('account header info in account section').located(by.xpath('(//android.view.ViewGroup[2]/android.widget.TextView)[1]')),
    //@xpath    
    accountUsername: () =>
        Target.the('account user name in account section').located(by.xpath('(//android.widget.ScrollView//android.view.ViewGroup[1])[2]')),
    //@xpath    
    addressButton: () => 
        Target.the('address button dashboard').located(by.xpath('(//*[@content-desc="catalogDashboard"]//preceding-sibling::android.view.ViewGroup)[2]')),
    addressFieldDeliveryData: () =>
        Target.the('address field delivery data screen').located(by.xpath('(//android.widget.TextView)[3]')),
    countryDropDown: () =>
        Target.the('country selector').located(by.xpath('//*[@resource-id="countryDropDown"]')),        
    closeButtonInputAddress: () =>
        Target.the('delete address input').located(by.xpath('(//*[@index="1"])[5]')),
    editButtonAddress: () =>
        Target.the('edit address button delivery data screen').located(by.xpath('(//android.widget.TextView)[4]')),
    //@xpath    
    endButton: () =>
        Target.the('button end update address').located(by.xpath('//*[@content-desc="button-next"]/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup')),
    finishButton: () =>
        Target.the('finish update address buttón').located(by.xpath('//android.view.ViewGroup[@content-desc="rightArrowButton"]')),
    deleteAddressButton: () =>
        Target.the('delete current input address button').located(by.xpath('(//android.view.ViewGroup)[26]')),
    inputAdress: () =>
        Target.the('input edit address').located(by.xpath('//android.widget.EditText[@content-desc="addressIndication"]')),
    //@xpath    
    mapAddress: () =>
        Target.the('map address').located(by.xpath('//android.view.ViewGroup[15]//android.view.ViewGroup[2]/android.widget.TextView[2]')),
    //@xpath
    invalidOtpMessage: () =>
        Target.the('invalid otp message').located(by.xpath('(//android.widget.TextView)[8]')),
    onboardingWelcomeEnter: () =>
        Target.the('onboarding Enter Button').located(by.xpath('//*[@content-desc="goToLogin"]')),
    onboardingPermissionsOption: () =>
        Target.the('onboarding location permissions option').located(by.xpath('//*[@resource-id="continue"]')),
    onboardingSignInPhone: () =>
        Target.the('phone number input').located(by.xpath('//*[@resource-id="phoneNumberInput"]')),
    popUpLocationPermission: () =>
        Target.the('pop-up location permission only when using the app ').located(by.id('com.android.permissioncontroller:id/permission_allow_foreground_only_button')),
    resultAddress: () =>
        Target.the('first result update address').located(by.xpath('//android.view.ViewGroup[@content-desc="address-suggest-list-item"]')),
    createAccount: () =>
        Target.the('Register new user option').located(by.xpath('//*[@content-desc="goToRegister"]')),
    loginAccount: () =>
        Target.the('login option').located(by.xpath('//*[@content-desc="goToLogin"]')),
    notificationAndLocationPermission: () =>
        Target.the('ask permissions button').located(by.xpath('//*[@content-desc="askPermission"]')),
    countryOptions: () =>
        Target.the('country options modal').located(by.xpath('//*[@content-desc="countryCodeButton"]')),
    selectCountry: (country: string) =>
        Target.the('Checkbox options to select the country').located(by.xpath(`//*[@content-desc="countryItemSelector${country}"]`)),
    phoneNumberInput: () =>
        Target.the('Input to enter the phone number').located(by.xpath('//*[@content-desc="phoneInput"]')),
    smsButton: () =>
        Target.the('Sms Button').located(by.xpath('//*[@content-desc="otpSmsButton"]')),
    wspButton: () =>
        Target.the('Whatsapp Button').located(by.xpath('//*[@content-desc="otpWhatsappButton"]')),
    callButton: () =>
        Target.the('Call Button').located(by.xpath('//*[@content-desc="otpCallButton"]')),
    otpField: () =>
        Target.the('Otp Field').located(by.xpath('//*[@content-desc="otpNumberInput"]')),
    //@xpath
    resendOtpcode: () =>
    Target.the('resend OTP code').located(by.xpath('(//android.widget.TextView)[9]')),
    //@xpath
    goToOmbiarding: () =>
    Target.the('').located(by.xpath('(//*[@index="0"])[19]')),
    
    //Profile
    //@xpath
    profileButton : () =>
        Target.the('Profile button').located(by.xpath('//*[@content-desc="tabBarButtonAccountStack"]')),
    //@xpath
    profileButtonForPvp : () =>
        Target.the('Profile button for PVP users').located(by.xpath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[7]/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup[5]')),
    //@xpath
    profileInformation : () =>
        Target.the('Profile information section title').located(by.xpath('(//android.widget.TextView)[2]')),
    //@xpath
    promotionalPoliticSection : () =>
        Target.the('Profile Promotional Politic title').located(by.xpath('(//android.widget.ImageView)[1]')),
    //@xpath
    closeSessionButton : () =>
        Target.the('Close Session Button').located(by.xpath("//*[starts-with(@text, 'Ce')]")),
    //@xpath
    closeSessionButtonConfirm : () =>
        Target.the('Close Session Button Confirm').located(by.xpath("//*[starts-with(@text, 'Si,')]"))
}
