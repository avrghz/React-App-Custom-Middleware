const BASE_YEAR = 1950;

export const BASE_URL = "http://ergast.com/api/f1";
export const QUERY_SEASONS = "/seasons.json?limit="+((new Date()).getFullYear() - BASE_YEAR + 1) +"&offset=0";
export const QUERY_CHAMPIONS = "/driverstandingsa/1.json?limit="+((new Date()).getFullYear() - BASE_YEAR + 1) +"&offset=0";
