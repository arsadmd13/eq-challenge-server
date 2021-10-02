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

exports.hourlyWithStats = (req, res, next) => {
    req.sqlQuery = `
        SELECT public.hourly_events.date, SUM(public.hourly_events.events) AS events, public.hourly_events.hour as hour,
        SUM(public.hourly_stats.impressions) AS impressions, SUM(public.hourly_stats.clicks) AS clicks, SUM(public.hourly_stats.revenue) AS revenue
        FROM public.hourly_events
        INNER JOIN public.hourly_stats
        ON public.hourly_events.date = public.hourly_stats.date 
        AND public.hourly_events.hour = public.hourly_stats.hour
        GROUP BY public.hourly_events.date, public.hourly_events.hour
        ORDER BY public.hourly_events.date, public.hourly_events.hour
        LIMIT 25;
    `;
    // req.sqlQuery = `
    //     SELECT public.hourly_events.date, SUM(events) as events
    //     FROM public.hourly_events
    //     INNER JOIN public.hourly_stats
    //     ON public.hourly_events.date = public.hourly_stats.date 
    //     AND public.hourly_events.hour = public.hourly_stats.hour
    //     GROUP BY public.hourly_events.date
    //     ORDER BY public.hourly_events.date;
    // `
    // req.sqlQuery = `
    //     SELECT date, hour, events
    //     FROM public.hourly_events
    //     ORDER BY date, hour
    //     LIMIT 168;
    // `;
    return next()
}

exports.dailyWithStats = (req, res, next) => {
    // req.sqlQuery = `
    //     SELECT public.hourly_events.date, SUM(public.hourly_events.events) AS events, public.hourly_events.hour as hour
    //     FROM public.hourly_events
    //     INNER JOIN public.hourly_stats
    //     ON public.hourly_events.date = public.hourly_stats.date 
    //     AND public.hourly_events.hour = public.hourly_stats.hour
    //     GROUP BY public.hourly_events.date, public.hourly_events.hour
    //     ORDER BY public.hourly_events.date, public.hourly_events.hour;
    // `
    req.sqlQuery = `
        SELECT public.hourly_events.date, SUM(public.hourly_events.events) AS events, COUNT(public.hourly_events.hour) as hours,
        SUM(public.hourly_stats.impressions) AS impressions, SUM(public.hourly_stats.clicks) AS clicks, SUM(public.hourly_stats.revenue) AS revenue
        FROM public.hourly_events
        INNER JOIN public.hourly_stats
        ON public.hourly_events.date = public.hourly_stats.date 
        AND public.hourly_events.hour = public.hourly_stats.hour
        GROUP BY public.hourly_events.date
        ORDER BY public.hourly_events.date
        LIMIT 25;
    `;
    return next()
}