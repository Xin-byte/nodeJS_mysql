import { networkInterfaces } from 'os'

const interfaces = networkInterfaces()

export const [, { address: ipAddress }] = interfaces['Wi-Fi'] || interfaces.Ethernet
