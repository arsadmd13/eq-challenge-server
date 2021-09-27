const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config({});


// const rateLimitting = require('./src/middlewares/rate-limiting.middleware');
const app = express();

app.use(cors())

// Using rate-limitter here world log every incomming rquests including non-api request 
// (i.e: It would log a count for requesting an angular client page. When hosted along with this server)
// To avoid that wee will use rate-limitter at the route file.
// app.use(rateLimitting)

app.use(express.static('public/dist/eq-challenge'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./src/routes/events.route")(app);
require("./src/routes/stats.route")(app);
require("./src/routes/poi.route")(app);

app.get('/', (req, res) => {
  res.send('Welcome to EQ Works 😎')
})

// Specifies the route for (Angular) client page
// The angular application should be built and put into public/dist to access them here.
app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/public/dist/eq-challenge/index.html");
});

app.listen(process.env.PORT || 5555, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  } else {
    console.log(`Running on ${process.env.PORT || 5555}`)
  }
})

// last resorts
process.on('uncaughtException', (err) => {
  console.log(`Caught exception: ${err}`)
  process.exit(1)
})
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
  process.exit(1)
})
