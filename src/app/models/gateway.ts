import { Device } from "./device";

export interface Gateway {
    usn: string,
    name: string,
    address: string,
    devices: Device[]
}