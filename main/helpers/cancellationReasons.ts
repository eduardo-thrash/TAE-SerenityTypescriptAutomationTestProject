import { CancellationReasonsByCountry } from '../dtos/checkout/cancellationReasons';

const cancellationReasons : CancellationReasonsByCountry[] = [
    {'country' : 'Colombia', 'reason' : 'Quiero modificar mi pedido' },
    {'country' : 'Colombia', 'reason' : 'No tengo dinero' },
    {'country' : 'Colombia', 'reason' : 'Pedido está demorado' },
    {'country' : 'Colombia', 'reason' : 'Pedido viene incompleto' },
    {'country' : 'Colombia', 'reason' : 'Encontré mejor precio' },
    {'country' : 'Colombia', 'reason' : 'Me están cobrando un valor diferente' },
    {'country' : 'Colombia', 'reason' : 'Quiero otro día de entrega' },
    {'country' : 'Colombia', 'reason' : 'Cambié mi dirección' },
    {'country' : 'Colombia', 'reason' : 'Ya hice otro pedido' },
    {'country' : 'Colombia', 'reason' : 'Ya me abastecí' },
    {'country' : 'Colombia', 'reason' : 'Otro' }
]

export const countryReason = (countryName : string) => {
    const reasons: CancellationReasonsByCountry[] = cancellationReasons.filter(countryData => countryData.country === countryName)

    if (!reasons) {
        throw 'the country does not contain information to test'
    }

    const randomIndex : number = Math.floor(Math.random() * reasons.length);
    const randomReason : string = reasons[randomIndex].reason;

    return {
        finalReason: randomReason,
        atIndex: randomIndex
    };
}