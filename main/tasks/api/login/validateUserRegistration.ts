import { TestCompromisedError } from '@serenity-js/core';

import { HasCoverageResponse } from '../../../dtos/onboarding/hasCoverageResponse';
import { MsUserResponse } from '../../../dtos/onboarding/msUserResponse';
import { StartSignUpResponse } from '../../../dtos/onboarding/startSignUpResponse';
import { Ensure } from '../../../questions/Ensure';

export const validateUserRegistration = {

    checkCoverageResult: async (hasCoverageResponse: HasCoverageResponse) => {
        let assertMessage: string
        const hasCoverage: boolean = hasCoverageResponse.hasCoverage

        if (hasCoverage === true) {
            assertMessage = 'The new user has coverage to purchase and receive orders'
        } else {
            assertMessage = 'The new user has not coverage. It is not possible to purchase an receive orders'
            throw new TestCompromisedError(assertMessage)
        }

        Ensure.that.isEqualTo(hasCoverage, true, assertMessage, assertMessage)
    },
    verifySignUpResult: async (startSignUpResponse: StartSignUpResponse, phone: string, firstName: string, lastName: string, country: string) => {
        const storeId: number = startSignUpResponse.storeId
        const userId: number = startSignUpResponse.userId
        const result: boolean = storeId > 0 && userId > 0
        const assertPass = `The sign up process in ${country} finished successfully for user: ${firstName} ${lastName} with phone: ${phone}`
        const assertFailed = `It was not possible to register the user: ${firstName} ${lastName} with phone: ${phone}. The sign up process failed in ${country}`
        Ensure.that.isEqualTo(result, true, assertPass, assertFailed)

    },
    viewUserInfoResultAfterSignUp: async (msUserResponse: MsUserResponse, userId: number, storeId: number, phone: string) => {
        let assertMessage: string

        const msUserId: number = msUserResponse.id
        const msUserStoreId: number = msUserResponse.store.id
        const msUserPhone: string = msUserResponse.phone
        const msUserHasAddress: boolean = msUserResponse.hasAddress
        const msUserIsFirstTime: boolean = msUserResponse.isFirstTime
        const msUserHasBillingInfo: boolean = msUserResponse.billingInfo.hasBillingInfo
        const expectedBillingInfo: boolean = msUserResponse.country === 'BR' ? true : false

        if (msUserId === userId && msUserStoreId === storeId && msUserPhone === phone) {
            if (msUserHasAddress === true && msUserIsFirstTime === true && msUserHasBillingInfo === expectedBillingInfo) {
                assertMessage = `The registration data is correct according to sign up, for storeId: ${storeId} and userId: ${userId}`
            }
        } else {
            assertMessage = `The registration data for storeId: ${storeId} and userId: ${userId} seems to be inconsistent with sign up`
            throw new TestCompromisedError(assertMessage)
        }
        Ensure.that.isEqualTo(msUserId, userId, assertMessage, assertMessage)
    }
}