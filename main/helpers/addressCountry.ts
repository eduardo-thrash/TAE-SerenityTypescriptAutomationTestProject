import { constants } from '../constants/constants'

export const addressCountry = {
    addressUpdate: (country : string) => {
        if(country == constants.colombiaAsACountry){
            const addressCo = constants.addressColombia
            return addressCo
        } else if (country == constants.mexicoAsACountry) {
            const addressMx = constants.addressMexico
            return addressMx
        } else {
            const addressBr = constants.addressBrazil
            return addressBr
        }    
    }
}