import { faker } from '@faker-js/faker'

import { constants } from '../../constants/constants'
import { NumbersByCountry } from '../../dtos/onboarding/country'
import { GetBusinessTypesResponse } from '../../dtos/onboarding/getBusinessTypesResponse'
import { GetDocumentsToAcceptResponse } from '../../dtos/onboarding/getDocumentsToAcceptResponse'
import { GetMacroCategoriesByCountryIdResponse } from '../../dtos/onboarding/getMacroCategoriesByCountryIdResponse'

export const startSignUpPayloadData = (countryInfo: NumbersByCountry, getBusinessTypesResponse: GetBusinessTypesResponse[], getDocumentsToAcceptResponse: GetDocumentsToAcceptResponse, idToken: string, getMacroCategoriesByCountryIdResponse: GetMacroCategoriesByCountryIdResponse[]) => {
    const startSignUpPayloadJSON = {
        lastName: faker.person.lastName(),
        firstName: `TAE ${faker.person.firstName()}`,
        phoneCode: Number.parseInt(countryInfo.phoneCode),
        storeName: `TAE ${faker.company.name()}`,
        businessTypeId: getBusinessTypesResponse[Math.floor(Math.random() * getBusinessTypesResponse.length)].id,
        adhereToNewFlow: true,
        acceptedDocumentsIds: getDocumentsToAcceptResponse.documents.map((item) => item.id),
        phone: Number.parseInt(countryInfo.phoneNumber),
        idToken: idToken,
        preferredMacroCategoriesIds: [
            getMacroCategoriesByCountryIdResponse[Math.floor(Math.random() * getMacroCategoriesByCountryIdResponse.length)].id
        ],
        email: `tae.${faker.internet.email().toLowerCase()}`
    }
    return startSignUpPayloadJSON
}

export const startSignUpAddressPayloadData = (countryInfo: NumbersByCountry) => {
    const signUpAddressPayloadJSON = {
        latitude: countryInfo.geoData.latitude,
        longitude: countryInfo.geoData.longitude,
        formatted: countryInfo.geoData.address,
        additionalInfo: constants.additionalInfoAddress
    }
    return signUpAddressPayloadJSON
}