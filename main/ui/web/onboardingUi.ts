import { by, Target } from '@serenity-js/webdriverio';

export const onboardingUi = {

    appChiperTooltip: () =>
        Target.the('the first tooltip to use app mobile').located(by.xpath("//button[contains(text(),'Recordarme más tarde')]")),

    knowUsButton: () =>
        Target.the('know us button in the onboarding page').located(by.xpath("//button[contains(text(),'Conócenos')]")),

    getInButton: () =>
        Target.the('get in button in the onboarding page').located(by.xpath('button:nth-of-type(2n)')),
    
    locationPermissionsButton: () =>
        Target.the('Permissions page to can access location').located(by.xpath("//button[@class='Buttons_button__2SH40 Buttons_primary__2DKhx  self-center rounded-4px ']")),
        
    inputPhoneNumber: () =>
        Target.the('Phone number input').located(by.xpath("input[name='inputNumberPhone']")),

    smsOptionButton: () =>
        Target.the('select sms button').located(by.xpath("//button[@data-testid='smsButton']")),

    whatsappOptionButton: () =>
        Target.the('select whatsapp button').located(by.xpath("//button[@data-testid='whatsappButton']")),

    callOptionButton: () =>
        Target.the('select call button').located(by.xpath("//button[@data-testid='callButton']")),

    otpInput: (index : number) =>
        Target.the('input to put the OTP').located(by.xpath(`//input[@data-id="${index}"]`)),

    resendOtpCode: () =>
        Target.the('Resend OTP code button').located(by.xpath("//button[@data-testid='resendButton']")),

    countryFlag : (phoneIndex) =>
        Target.the('country flag option').located(by.xpath(`//body/div[@id='root']/div[2]/div[2]/div[1]/button[${phoneIndex}]`)),

    countrySelector : () =>
        Target.the('country selector').located(by.xpath('//body/div[@id="root"]/div[2]/div[2]/div[1]')),   
    
    channelOptions : (channel) =>
        Target.the('channel Options').located(by.xpath(`//button[@data-testid="${channel}Button"]`)),

    messageSentOtp : () =>
        Target.the('otp send message alert').located(by.id('cflcan0')),
    
    assistButton : () =>  
        Target.the('assist button').located(by.xpath('//button[@data-testid="assistButton"]')),

    resendButton : () =>
        Target.the('resend otp button').located(by.xpath('//button[@data-testid="resendButton"]')),
    
    AccountButton : () =>
        Target.the('Footer Account button').located(by.xpath('button[data-testid="Cuenta"]')),
    
    AccountSections : (index : number) =>
        Target.the('Profile Account Section').located(by.xpath(`section ul:nth-of-type(${index})`)),
    
    AccountLogOutButton : () =>
        Target.the('Profile Log Out Button').located(by.xpath('section button:nth-of-type(2)')),
    
    AccountLogOutConfirmationButton : () =>
        Target.the('Profile Confirmation Log Out Button').located(by.xpath('div h3 ~ button:nth-of-type(2)'))
}