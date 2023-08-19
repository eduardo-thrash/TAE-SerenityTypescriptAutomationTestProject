import { by, Target } from '@serenity-js/webdriverio';

export const loginUi = {
    email: () =>
        Target.the('user email to login').located(by.css('[name = "email"]')),
    password: () =>
        Target.the('user password to login').located(by.css('[name = "password"]')),
    forgotPassword: () =>
        Target.the('forgot password url').located(by.tagName('a')),
    loginButton: () =>
        Target.the('login button').located(by.xpath('[value=Login]'))
}