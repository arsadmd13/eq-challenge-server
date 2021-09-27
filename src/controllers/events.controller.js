exports.hourly = (req, res, next) => {
    req.sqlQuery = `
        SELECT date, hour, events
        FROM public.hourly_events
        ORDER BY date, hour
        LIMIT 168;
    `;
  return next()
}

exports.hourlyEventsForDate = (req, res, next) => {
    let date = req.body.date
    req.sqlQuery = `
        SELECT date, hour, events
        FROM public.hourly_events
        WHERE date = '${date}'
        LIMIT 168;
    `
    return next()
}

exports.daily = (req, res, next) => {
    req.sqlQuery = `
        SELECT date, SUM(events) AS events
        FROM public.hourly_events
        GROUP BY date
        ORDER BY date
        LIMIT 7;
    `
    return next()
}