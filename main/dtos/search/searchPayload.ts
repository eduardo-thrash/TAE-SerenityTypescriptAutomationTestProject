export interface SearchPayload {
    flagWithoutStock: boolean,
    fromAutocomplete: number,
    hideCigarettes: boolean,
    idSectionReq: string,
    locationId: number,
    query: string,
    queryType: string,
    searchId: string,
    sectionReq: string,
    sessionId: string,
    storeId: number,
    threadingFlag: string,
    warehouseIds: Array<number>,
    searchVersion: string
}