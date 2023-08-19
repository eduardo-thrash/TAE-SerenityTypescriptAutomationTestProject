export interface CheckShoppingCarResponse {
    cache: cache[],
    status: string
}

interface cache {
    price: string,
    stock: string,
    valorization: string,
    warehouse: string
}