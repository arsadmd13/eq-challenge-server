const queryHandler = require("../db/queryHandler");
const eventsController = require("../controllers/events.controller");
const rateLimitter = require("../middlewares/rate-limiting.middleware");

module.exports = (app) => {

    app.get('/events/hourly', rateLimitter, eventsController.hourly, queryHandler.fetchRows);

    app.post('/events/hourly', rateLimitter, eventsController.hourlyEventsForDate, queryHandler.fetchRows);

    app.get('/events/daily', rateLimitter, eventsController.daily, queryHandler.fetchRows);
};
