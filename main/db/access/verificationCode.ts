import { NumbersByCountry } from '../../dtos/onboarding/country'
import { countryData } from '../../helpers/country'
import { verificationCode } from '../models/verificationCodeModel'

export const getOtpByPhone = async (phone: number, country: string) => {

    const countryInfo : NumbersByCountry = countryData(country)
    const phoneToFind  = `+${countryInfo.phoneCode}${phone}`

    try {
        const code = await verificationCode.findOne({
            attributes: ['code'],
            where: {
                search_key: phoneToFind
            },
            order: [
                ['id' , 'DESC']
            ]
        })

        return code.toJSON()

    } catch (error) {
        console.error('error find the otp codes', { err: error })
    }
}