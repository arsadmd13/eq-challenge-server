const queryHandler = require("../db/queryHandler");
const statsController = require("../controllers/stats.controller")
const rateLimitter = require("../middlewares/rate-limiting.middleware");

module.exports = (app) => {

    app.get('/stats/hourly', rateLimitter, statsController.hourly, queryHandler.fetchRows);

    app.get('/stats/daily', rateLimitter, statsController.daily, queryHandler.fetchRows);
};
