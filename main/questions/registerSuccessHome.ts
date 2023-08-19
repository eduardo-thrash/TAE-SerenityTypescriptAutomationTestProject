import { Ensure } from '@serenity-js/assertions';
import { Duration, Task } from '@serenity-js/core'
import { isVisible, Wait } from '@serenity-js/webdriverio';

import { catalogUI } from '../ui/catalog';
import { searchBarUi } from '../ui/searchBar';

export const registerSuccessHome = {
    check: () => 
        Task.where(
            `#actor checks the enough fields to confirm a success onboarding`,
            Wait.upTo(Duration.ofSeconds(15)).until(searchBarUi.searchBarBanner(), isVisible()),
            Wait.until(catalogUI.catalogCustomerAddress(), isVisible()),
            Ensure.that(catalogUI.catalogCustomerAddress(), isVisible()),
        )
}
