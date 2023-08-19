export interface AutocompletePayload {
    query: string,
    locationId: number,
    threadingFlag: string,
    sessionId: string,
    storeId: number,
    warehouseId: Array<number>,
    hideCigarettes: boolean
}