import { actorInTheSpotlight } from '@serenity-js/core';
import { GetRequest, LastResponse, PostRequest, Send } from '@serenity-js/rest';

import { constants } from '../../../constants/constants';
import { endPoints } from '../../../constants/endPoints';
import { httpCodes } from '../../../constants/httpCodes';
import { SignUpAddressPayloadBuilder, StartSignUpPayloadBuilder } from '../../../dtos/onboarding/builders/startSignUpBuilder';
import { NumbersByCountry } from '../../../dtos/onboarding/country';
import { GetBusinessTypesResponse } from '../../../dtos/onboarding/getBusinessTypesResponse';
import { GetDocumentsToAcceptResponse } from '../../../dtos/onboarding/getDocumentsToAcceptResponse';
import { GetMacroCategoriesByCountryIdResponse } from '../../../dtos/onboarding/getMacroCategoriesByCountryIdResponse';
import { IsNewPhoneResponse } from '../../../dtos/onboarding/isNewPhoneResponse';
import { SignUpAddressPayload, StartSignUpPayload } from '../../../dtos/onboarding/startSignUpPayload';
import { StartSignUpResponse } from '../../../dtos/onboarding/startSignUpResponse';
import { apiAsserts } from '../../../helpers/apiAsserts';
import { callAnApi } from '../../../helpers/callApi';
import { configs } from '../../../helpers/configs';
import { randomNumbers } from '../../../helpers/randomNumbers';
import { startSignUpAddressPayloadData, startSignUpPayloadData } from '../../../questions/business/onboarding.business';

export const onboarding = {
    verifyPhoneNumber: async (countryInfo: NumbersByCountry): Promise<NumbersByCountry> => {
        let isNewPhoneNumber = false

        while (!isNewPhoneNumber) {
            await callAnApi(
                Send.a(
                    GetRequest.to(endPoints.isNewUser.replace('{{phone_code}}', countryInfo.phoneCode).replace('{{phone}}', countryInfo.newPhoneNumber))
                        .using({ timeout: constants.apiDefaultTimeOut, headers: configs.apiDefaultHeaders })
                )
            )

            await apiAsserts.successResponse(httpCodes.OK)

            const isNewPhoneResponse: IsNewPhoneResponse = await actorInTheSpotlight().answer(LastResponse.body<IsNewPhoneResponse>())

            if (isNewPhoneResponse.isNewUser === true) {
                isNewPhoneNumber = true
                countryInfo.phoneNumber = countryInfo.newPhoneNumber
            } else {
                countryInfo.newPhoneNumber = randomNumbers.getNewPhoneNumber(countryInfo.country)
            }

        }
        return countryInfo
    },
    getDocumentsToAccept: async (idToken: string, countryId: string): Promise<GetDocumentsToAcceptResponse> => {
        await callAnApi(
            Send.a(
                GetRequest.to(endPoints.documentsToAccept.replace('{{country_id}}', countryId))
                    .using({ timeout: constants.apiDefaultTimeOut, headers: { Authorization: `Bearer ${idToken}`, ...configs.apiDefaultHeaders } }),
            )
        )

        await apiAsserts.successResponse(httpCodes.OK)

        return await actorInTheSpotlight().answer(LastResponse.body<GetDocumentsToAcceptResponse>())
    },
    getBusinessTypes: async (idToken: string): Promise<GetBusinessTypesResponse[]> => {
        await callAnApi(
            Send.a(
                GetRequest.to(endPoints.businessTypes)
                    .using({ timeout: constants.apiDefaultTimeOut, headers: { Authorization: `Bearer ${idToken}`, ...configs.apiDefaultHeaders } }),
            )
        )

        await apiAsserts.successResponse(httpCodes.OK)

        return await actorInTheSpotlight().answer(LastResponse.body<GetBusinessTypesResponse[]>())
    },
    getMacroCategoriesByCountryId: async (idToken: string, countryId: string): Promise<GetMacroCategoriesByCountryIdResponse[]> => {
        await callAnApi(
            Send.a(
                GetRequest.to(endPoints.getMacroCategoriesByCountryId.replace('{{country_id}}', countryId))
                    .using({ timeout: constants.apiDefaultTimeOut, headers: { Authorization: `Bearer ${idToken}`, ...configs.apiDefaultHeaders } }),
            )
        )

        await apiAsserts.successResponse(httpCodes.OK)

        return await actorInTheSpotlight().answer(LastResponse.body<GetMacroCategoriesByCountryIdResponse[]>())
    },
    startSignUpProcess: async(countryInfo: NumbersByCountry, getBusinessTypesResponse: GetBusinessTypesResponse[], getDocumentsToAcceptResponse: GetDocumentsToAcceptResponse, idToken: string, getMacroCategoriesByCountryIdResponse: GetMacroCategoriesByCountryIdResponse[]) : Promise<StartSignUpResponse> => {
        const signUpAddressData = startSignUpAddressPayloadData(countryInfo)
        const startSignUpData = startSignUpPayloadData(countryInfo, getBusinessTypesResponse, getDocumentsToAcceptResponse, idToken, getMacroCategoriesByCountryIdResponse)
        const signUpAddressPayload: SignUpAddressPayload = SignUpAddressPayloadBuilder(signUpAddressData.latitude, signUpAddressData.longitude, signUpAddressData.formatted, signUpAddressData.additionalInfo)
        const startSignUpPayload: StartSignUpPayload = StartSignUpPayloadBuilder(signUpAddressPayload, startSignUpData.lastName, startSignUpData.firstName, startSignUpData.phoneCode, startSignUpData.storeName, 
            startSignUpData.businessTypeId, startSignUpData.acceptedDocumentsIds, startSignUpData.phone, startSignUpData.idToken, startSignUpData.preferredMacroCategoriesIds, startSignUpData.email)

        await callAnApi(
            Send.a(
                PostRequest.to(endPoints.startSignUp)
                    .with(JSON.stringify(startSignUpPayload))
                    .using({ timeout: constants.apiDefaultTimeOut, headers: { Authorization: `Bearer ${idToken}`, ...configs.apiDefaultHeaders } }),
            )
        )

        await apiAsserts.successResponse(httpCodes.CREATED)

        return await actorInTheSpotlight().answer(LastResponse.body<StartSignUpResponse>())
    }
}