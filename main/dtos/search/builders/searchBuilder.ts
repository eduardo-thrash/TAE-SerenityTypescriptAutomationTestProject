export const AutocompleteBuilder = (query: string, locationId: number, sessionId: string, storeId: number, warehouseId: Array<number>) => (
    {
        query: query,
        locationId: locationId,
        threadingFlag: '0',
        sessionId: sessionId,
        storeId: storeId,
        warehouseId: warehouseId,
        hideCigarettes: false
    }
)

export const SearchBuilder = (locationId: number, query: string, queryType: string, searchId: string, sessionId: string, storeId: number, warehouseIds: Array<number>, searchVersion: string) => (
    {
        flagWithoutStock: true, 
        fromAutocomplete: 1, 
        hideCigarettes: false, 
        idSectionReq: '', 
        locationId: locationId, 
        query: query, 
        queryType: queryType, 
        searchId: searchId, 
        sectionReq: '', 
        sessionId: sessionId, 
        storeId : storeId, 
        threadingFlag: '0', 
        warehouseIds: warehouseIds, 
        searchVersion: searchVersion 
    }
)