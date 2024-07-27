
const cache = {};

const CACHE_EXPIRY = 1000 * 60 * 60 ; // 1 hour

async function getCache(key) {
    const cachedData = cache[key];
    if(cachedData && cachedData.expiration > Date.now()) {
        return cachedData.data;
    }
    return null;
}

async function setCache(key, data)  {
    const expiration = Date.now() + CACHE_EXPIRY;
    cache[key] = {
        data,
        expiration,
    };
}

module.exports = {
    getCache,
    setCache,
};