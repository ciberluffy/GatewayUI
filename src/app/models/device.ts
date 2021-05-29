import { Gateway } from "./gateway";

export interface Device {
    uid: number,
    vendor: string,
    created: string,
    online: boolean,
    gateway?: Gateway
}