import { LogicError } from '@serenity-js/core'

import { constants } from '../constants/constants'
import { NumbersByCountry } from '../dtos/onboarding/country'
import { randomNumbers } from './randomNumbers'

const numbersByCountry : NumbersByCountry[] = [
    {'country' : 'Colombia', 'phoneNumber' : '3008425830', 'code': 'co', 'phoneCode' : '57', 'address': 'Calle 145 #128-41', 'index' : 1, 'numberWithoutOrders' : '5015955359', 'minimunOrderValue': 100000, 'newPhoneNumber': randomNumbers.getNewPhoneNumber(constants.colombiaAsACountry), 'countryId' : '6', 'geoData': {'address': 'Carrera 1A 65B-15, 110231 Bogotá, D.C., Colombia', 'latitude': 4.64732, 'longitude': -74.05483}},
    {'country' : 'Brasil', 'phoneNumber' : '65432178999', 'code': 'br', 'phoneCode' : '55', 'address': 'some location' , 'index' : 3, 'numberWithoutOrders' : '', 'minimunOrderValue': 160, 'newPhoneNumber': randomNumbers.getNewPhoneNumber(constants.brazilAsACountry), 'countryId' : '8', 'geoData': {'address': 'Sao Paulo, SP, Brasil', 'latitude': -23.56287, 'longitude': -46.65468}},
    {'country' : 'México', 'phoneNumber' : '9066751313', 'code': 'mx', 'phoneCode' : '52', 'address': 'Donceles 63, Centro, 06000 Cuauhtémoc' , 'index' : 2, 'numberWithoutOrders' : '', 'minimunOrderValue': 600, 'newPhoneNumber': randomNumbers.getNewPhoneNumber(constants.mexicoAsACountry), 'countryId' : '7', 'geoData': {'address': 'Ixtapaluca, Méx., México', 'latitude': 19.3090538, 'longitude': -98.9079782}}
]

export const countryData = (countryName: string) : NumbersByCountry => {
    const countryInfo : NumbersByCountry = numbersByCountry.find(countryData => countryData.country.toLowerCase() === countryName.toLocaleLowerCase())
    
    if(!countryInfo){
        throw new LogicError(`the country ${countryName} does not contain data to test here`)
    }
    
    return countryInfo
}