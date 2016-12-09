const loc: Location = window.location;
const port: any = loc.port === '4200' ? 3010 : loc.port;

export const API_URL = `${loc.protocol}//${loc.hostname}:${port}/api`;
