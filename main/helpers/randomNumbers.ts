import { constants } from '../constants/constants';

export const randomNumbers = {
    getNewPhoneNumber: (country: string) => {
        if (country == constants.colombiaAsACountry) {
            return randomNumbers.generateNewRandomPhone(1000000000, 9999999999, 3000000000, 3999999999)
        } else if (country == constants.mexicoAsACountry) {
            return randomNumbers.generateNewRandomPhone(1000000000, 9999999999, 5000000000, 5999999999)
        } else if (country == constants.brazilAsACountry) {
            return randomNumbers.generateNewRandomPhone(10000000000, 99999999999, 10000000000, 19999999999)
        }
    },

    /*
        Generar un nuevo número de celular de forma aleatoria, garantizando que NO sea creado en un rango NO DESEADO
        Rango NO DESEADO: entiéndase cómo el rango de números posibles REALES que se pueden generar.
        Evitamos crear números en rangos NO DESEADOS, para que no lleguen WhatsApp, SMS o llamadas a números REALES.

        Rangos NO DESEADOS por país:
        CO: (3000000000 - 3999999999)
        MX: (5000000000 - 5999999999)
        BR: (10000000000 - 19999999999)

        variables:
        expectedMin: es el valor mínimo de un rango DESEADO para generar nuestro número candidato a registrar
        expectedMax: es el valor máximo de un rango DESEADO para generar nuestro número candidato a registrar
        limitMin: es el valor mínimo excluyente de un rango NO DESEADO para evitar generar un número candidato a registrar
        limitMax: es el valor mínimo excluyente de un rango NO DESEADO para evitar generar un número candidato a registrar
    */
    generateNewRandomPhone: (expectedMin: number, expectedMax: number, limitMin: number, limitMax: number) => {
        let newPhone = Math.floor(Math.random() * (expectedMax - expectedMin + 1)) + expectedMin;
        while (newPhone >= limitMin && newPhone <= limitMax) {
            newPhone = Math.floor(Math.random() * (expectedMax - expectedMin + 1)) + expectedMin;
        }

        return newPhone.toString();
    }
}