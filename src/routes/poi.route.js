const queryHandler = require("../db/queryHandler");
const poiController = require("../controllers/poi.controller")
const rateLimitter = require("../middlewares/rate-limiting.middleware");

module.exports = (app) => {

    app.get('/poi', rateLimitter, poiController.getPoi, queryHandler.fetchRows);

};
