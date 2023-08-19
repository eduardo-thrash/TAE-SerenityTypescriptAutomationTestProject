import { constants } from '../constants/constants'
import { HitsResult } from '../dtos/search/searchResponse'

export const hits = {

    getPricesByCondition: (condition: string, hitsResults: HitsResult[]): HitsResult[] =>
        condition === constants.shoppingCartIsMajorToMinOrderValue ?
            hits.getOrderByPrice(hitsResults) :
            hits.getOrderByPrice(hitsResults, 'asc'),
    
    getOrderByPrice: (hits: HitsResult[], type = 'desc') =>
        type === 'desc' ? 
            hits.filter(data => data.name.toLowerCase().includes(constants.productName.toLowerCase()) && data.stock > 0)
                .sort((currentItem, nextItem) => nextItem.prices[0].managerTotal - currentItem.prices[0].managerTotal)
                .slice(0, 1) :
            hits.filter(data => data.name.toLowerCase().includes(constants.productName.toLowerCase()) && data.stock > 0)
                .sort((currentItem, nextItem) => currentItem.prices[0].managerTotal - nextItem.prices[0].managerTotal)
                .slice(0, 1)
}