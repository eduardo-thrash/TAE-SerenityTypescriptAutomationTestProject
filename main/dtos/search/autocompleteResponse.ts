import { metadataDescriptionResponse } from './metadataDescriptionResponse';
import { metadataPricingResponse } from './metadataPricing';

export interface AutocompleteResponse {
    _name : string,
    name : string,
    trace : string,
    _trace : string,
    query : string,
    locationId : number,
    storeId : string,
    sessionId : string,
    macros : Array<any>,
    keywordsHit : Array<string>,
    hasSponsors : Array<boolean>,
    metadataReferences : Array<any>,
    isElastic : boolean,
    metadataDescription : Array<metadataDescriptionResponse>,
    count: number,
    timeElapsed : number,
    metadataPricing : Array<metadataPricingResponse>
}