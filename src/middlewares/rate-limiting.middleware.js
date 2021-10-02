const redis = require('ioredis')

// Credentials from redislabs.com
const client = redis.createClient({
  host: process.env.REDISHOST,
  port: process.env.REDISPORT,
  password: process.env.REDISPASSWORD,
});

client.on("connect", () => {
  console.log("Connected to redis!");
});

module.exports = async (req, res, next) => {
  let ip = req.ip;
  let count;

  try {
    count = await client.incr(ip)
  } catch (err) {
    throw err;
  }


  if(count === 1) {
    client.expire(ip, 60);
  } else if (count > 10) {
    let remainingTime = await client.ttl(ip);
    return res.status(429).send({
      message: "Rate limit exceeded!",
      cooldownTime: remainingTime
    });
  } 
  
  next();
}