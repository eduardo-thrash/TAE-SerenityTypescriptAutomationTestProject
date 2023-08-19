export interface HasCoverageResponse {
    warehouseIds : Array<number>,
    hasCoverage : boolean,
    coverages : object,
    locationId : number,
    latitude : string,
    longitude : string,
    formatedAddress : string
}