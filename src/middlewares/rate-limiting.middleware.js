const redis = require('redis')

// Credentials from redislabs.com
const client = redis.createClient({
  host: process.env.REDISHOST,
  port: process.env.REDISPORT,
  password: process.env.REDISPASSWORD,
});

client.on("connect", () => {
  console.log("Connected to redis!");
});

module.exports = (req, res, next) => {
  let ip = req.ip;

  client.exists(ip, (err, doc) => {
    if (err) {
      console.log("Unable to connect to redis....")
      return res.status(500).send("Internal Server Error");
    }

    if (doc === 1) {
      client.get(ip, (err, doc) => {
        if(err) {
          return res.status(500).send("Internal Server Error");
        }

        let data = JSON.parse(doc)
        let currentTime = new Date().getTime();
        let timeDiff = (currentTime - data.startTime) / 60 / 1000;
        
        if (timeDiff >= 1) {
          let body = {
            'accessCount': 1,
            'startTime': new Date().getTime()
          }
          client.set(ip, JSON.stringify(body))
          next()
        } else if (timeDiff < 1) {
          if (data.accessCount >= 10) {
            let cooldownTime = (60 - Math.trunc((new Date().getTime() - data.startTime)/1000))
            return res.status(429).send({
              message: "Rate time exceeded!",
              cooldownTime: cooldownTime
            });
          } else {
            data.accessCount++;
            client.set(ip, JSON.stringify(data))
            next()
          }
        }
        
      })
    } else {
      let userData = {
        'accessCount': 1,
        'startTime': new Date().getTime()
      };
      client.set(ip, JSON.stringify(userData))
      next()
    }

  })
}