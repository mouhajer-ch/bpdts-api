export interface Coordinates {
    readonly latitude: number;
    readonly longitude: number;
}

export interface User {
    readonly id: number,
    readonly first_name: string,
    readonly last_name: string,
    readonly email: string,
    readonly ip_address: string,
    readonly latitude: number,
    readonly longitude: number
}