export interface ProductIF {
    name: string;
    price: number;
    description: string;
    category: string;
    quantity: number;
    farmer: string;
    distributor: string;
    retailer: string;
}

export type LoginIF = {
    email: string,
    password: string,
}
export type SignUpIF = {
    email: string,
    password: string,
    name: string,
    role: string,
    address: string,
}