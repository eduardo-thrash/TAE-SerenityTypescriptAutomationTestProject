/**
    @module Shopping_Car_Bussiness_rules
*/
import {TestCompromisedError } from '@serenity-js/core';

import { AddItemsResponse } from '../../../dtos/checkout/AddItemsResponse';
import { GetShoppingCarDetailsResponse } from '../../../dtos/checkout/getShoppingCartResponse';
import { Ensure } from '../../../questions/Ensure';

/** 
 * Elements Added to car through the endpoint items must match with the products got in the endpoint car details (click on car button).
 * @param {string} addItemsResponse addItemsResponse - Producst list that we added to car 
 * @param {string} getShoppingCarDetails getShoppingCarDetails - Product list that car details endpoint returns
 * @returns {Promise<void>} result
*/
export const validateGetCarDetails = async (addItemsResponse: AddItemsResponse, getShoppingCarDetails: GetShoppingCarDetailsResponse): Promise<void> => {
    
    let itemsStatus = true
    let assertMessage: string
    
    addItemsResponse.carts[0].items.forEach(itemAdded => {
        const idProductAdded: number = itemAdded.id
        const itemMatched = getShoppingCarDetails.carts[0].items.filter(itemResponsed => itemResponsed.id === idProductAdded)
        
        if(itemMatched.length === 1) {
            assertMessage = 'All the products added through the endpoint items match with the products got in the endpoint to get the car details'
        } else if(itemMatched.length > 1) {
            throw new TestCompromisedError(`the element ${itemAdded} must be only one time in the array and was found ${itemMatched.length} times`)
        }else{
            itemsStatus = false
            assertMessage = 'Some product added was not found in the products got in the endpoint car details'
        }
    })
    
    Ensure.that.isEqualTo(itemsStatus,true,assertMessage,assertMessage)
}
