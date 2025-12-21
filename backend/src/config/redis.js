import { createClient } from 'redis';


let client;
if (process.env.USE_REDIS === 'true') {
    client = createClient({ url: process.env.REDIS_URL || 'redis://redis:6379' });
    client.on('error', (err) => console.error('Redis Client Error', err));
    client.on('connect',()=> console.log("redis succesfully connected"))
} 
else {
    console.log('Redis disabled, using in-memory fallback');
    const store = new Map();
    client = {
        async set(key, value, options = {}) 
        { store.set(key, { value, expireAt: options.EX ? Date.now() + options.EX * 1000 : null }); }, 
        async get(key) { 
            const entry = store.get(key); 
            if (!entry) return null; 
            if (entry.expireAt && Date.now() > entry.expireAt) { 
                store.delete(key); 
                return null; 
            } 
            return entry.value; 
        },
        async expire(key, seconds) { 
            const entry = store.get(key); 
            if (entry) { 
                entry.expireAt = Date.now() + seconds * 1000; 
                store.set(key, entry); 
            } 
        }, 
        async ttl(key) {
            const entry = store.get(key); 
            if (!entry || !entry.expireAt) return -1; 
            const remaining = Math.floor((entry.expireAt - Date.now()) / 1000); 
            return remaining > 0 ? remaining : -2; // -2 means expired 
    } };
}
export default client;