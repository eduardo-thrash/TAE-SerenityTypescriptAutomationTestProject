import { PostRequest, Send } from '@serenity-js/rest';

import { actorMemories } from '../../../constants/actorMemories';
import { constants } from '../../../constants/constants';
import { endPoints } from '../../../constants/endPoints';
import { HitsResult } from '../../../dtos/search/searchResponse';
import { shoppingCartPayload } from '../../../dtos/shoppingCart/shoppingCartPayload';
import { recall, remember } from '../../../helpers/actorMemory';
import { callAnApi } from '../../../helpers/callApi';
import { configs } from '../../../helpers/configs';
import { finishTest } from '../../../helpers/finishTest';

export const addToShoppingCart = {
    with: async () => {

        let subtotal = 0;

        const idToken: string = await recall(actorMemories.idToken)
        const warehouseIds = await recall(actorMemories.warehouseIds)
        const minOrderValue: number = await recall(actorMemories.minOrderValue)
        const productsFromSearchBar : HitsResult[] = await recall(actorMemories.productsFromSearchBar)

        const shoppingCartItems: Array<shoppingCartPayload> = productsFromSearchBar.map(product => ({ id: product.id, merchantId: 0, quantity: 1, warehouseId: warehouseIds[0], type: 'PRODUCT', sponsored: false }))

        productsFromSearchBar.forEach((item) => {
            item.prices.forEach((price) => {
                subtotal = subtotal + price.managerTotal;
            })
        })

        if (subtotal < minOrderValue) {         
            const randomElement = Math.floor(Math.random()*productsFromSearchBar.length)
            const needed = Math.ceil((minOrderValue /productsFromSearchBar[randomElement].prices[0].managerTotal));
            const calc_mult = Math.ceil(needed / productsFromSearchBar[randomElement].multipleQuantity);
            const required = productsFromSearchBar[randomElement].multipleQuantity * calc_mult;
            shoppingCartItems.splice(randomElement, 1, { id: shoppingCartItems[randomElement].id, merchantId: 0, quantity: required, warehouseId: warehouseIds[0], type: 'PRODUCT', sponsored: false })
        }

        const shoppingCart: shoppingCartPayload = {
            locationId: 2,
            items: shoppingCartItems
        }

        await callAnApi(
            Send.a(
                PostRequest.to(endPoints.addItemsToShoppingCar.replace('{{store_id}}', await recall(actorMemories.storeId)))
                    .with(JSON.stringify(shoppingCart))
                    .using({ timeout: constants.apiDefaultTimeOut, headers: { Authorization: `Bearer ${idToken}`, ...configs.apiDefaultHeaders } }),
            )
        )
        
        await remember(actorMemories.shoppingCartSubtotal, subtotal)

        return finishTest();
    }
}