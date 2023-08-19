export interface NumbersByCountry {
    country: string
    phoneNumber: string
    code: string,
    phoneCode: string,
    address: string,
    index : number,
    minimunOrderValue : number,  
    numberWithoutOrders : string,
    newPhoneNumber: string,
    countryId: string,
    geoData: GeoDataByCountry
}

export interface GeoDataByCountry {
    address: string,
    latitude: number,
    longitude: number
}