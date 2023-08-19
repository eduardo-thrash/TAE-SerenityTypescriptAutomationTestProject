import { actorInTheSpotlight} from '@serenity-js/core';
import { LastResponse, PatchRequest, PostRequest, Send } from '@serenity-js/rest';
import * as dotenv from 'dotenv'

import { constants } from '../../../constants/constants';
import { endPoints } from '../../../constants/endPoints';
import { httpCodes } from '../../../constants/httpCodes';
import { checkOtpBuilder, sendOtpBuilder } from '../../../dtos/onboarding/builders/OtpBuilders';
import { NumbersByCountry } from '../../../dtos/onboarding/country';
import { checkOtpPayload } from '../../../dtos/onboarding/otp/checkOtpPayload';
import { checkOtpResponse } from '../../../dtos/onboarding/otp/checkOtpResponse';
import { sendOtpPayload } from '../../../dtos/onboarding/otp/sendOtpPayload';
import { sendOtpResponse } from '../../../dtos/onboarding/otp/sendOtpResponse';
import { apiAsserts } from '../../../helpers/apiAsserts';
import { callAnApi } from '../../../helpers/callApi';
import { configs } from '../../../helpers/configs';
import { getApiLoginByChannel } from '../../../helpers/getLoginByChannel';

dotenv.config()

export const otp = {
    send : async (countryInfo: NumbersByCountry, channel : string): Promise<sendOtpResponse> => {
        const phone: string = countryInfo.phoneNumber
        const phoneCode : string = countryInfo.phoneCode

        const channelByCountry : string = getApiLoginByChannel(channel)
        
        const sendOtpPayload: sendOtpPayload = sendOtpBuilder(phone, phoneCode, channelByCountry)

        await callAnApi(
            Send.a(
                PostRequest.to(endPoints.sendOtp)
                .with(JSON.stringify(sendOtpPayload))                
                .using({timeout : constants.apiDefaultTimeOut, headers : configs.apiDefaultHeaders })
            ),
        )

        await apiAsserts.successResponse(httpCodes.CREATED)
        
        const sendOtpResponse: sendOtpResponse = LastResponse.body<sendOtpResponse>().answeredBy(actorInTheSpotlight())
            
        return sendOtpResponse
    },
    
    check : async (phone: number, phoneCode: string ,country: string): Promise<checkOtpResponse> => {
        //const  otp : any = await getOtpByPhone(phone, country) //WORKAROUND TEMPORAL MIENTRAS VALIDAMOS PROBLEMA A LA HORA DE VALIDAR OTP
        const otp = phone.toString().slice(-4) //WORKAROUND TEMPORAL MIENTRAS VALIDAMOS PROBLEMA A LA HORA DE VALIDAR OTP

        const checkOtpPayload: checkOtpPayload = checkOtpBuilder(phone.toString(), phoneCode, otp)

        await callAnApi(
            Send.a(
                PatchRequest.to(endPoints.sendOtp)
                .with(JSON.stringify(checkOtpPayload))
                .using({timeout : constants.apiDefaultTimeOut, headers : configs.apiDefaultHeaders })
            )
        )

        await apiAsserts.successResponse(httpCodes.OK)
        
        const checkOtpResponse : checkOtpResponse = await actorInTheSpotlight().answer(LastResponse.body<checkOtpResponse>())
        
        return checkOtpResponse
    }
}
