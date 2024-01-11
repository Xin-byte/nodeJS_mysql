import { networkInterfaces } from 'os'

const interfaces = networkInterfaces()
const networkInterface = interfaces['Wi-Fi'] || interfaces.Ethernet

export const { address: ipAddress } = networkInterface.find(({ family }) => family === 'IPv4')
