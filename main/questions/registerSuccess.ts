import { Ensure, not} from '@serenity-js/assertions';
import { Task } from '@serenity-js/core'
import { isClickable, Wait } from '@serenity-js/webdriverio';

import { registerUI } from '../ui/register';

export const registerSuccess = {
    check: () => {
        return Task.where(
            `#actor checks the button is not clickable`,
            Wait.until(registerUI.registerButton(), not(isClickable())),
            Ensure.that(registerUI.registerButton(), not(isClickable())), 
        )
    }
}