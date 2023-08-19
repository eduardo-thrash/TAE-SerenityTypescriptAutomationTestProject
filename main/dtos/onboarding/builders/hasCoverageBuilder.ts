import { hasCoveragePayload } from '../hasCoveragePayload';

export const HasCoverageBuilder = (addressData: string, countryId: number, lat: bigint | number, long: bigint | number, storeId: number ): hasCoveragePayload => (
    {
        addressData, 
        countryId,
        lat,
        long,
        storeId 
    }
)