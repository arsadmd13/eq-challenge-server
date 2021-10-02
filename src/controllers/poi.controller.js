exports.getPoi = (req, res, next) => {
    req.sqlQuery = `
        SELECT *
        FROM public.poi;
    `
    return next()
}

exports.poiWithStatsAndEvents = (req, res, next) => {
    req.sqlQuery = `
        SELECT public.poi.*, SUM(public.hourly_stats.revenue) as revenue, SUM(public.hourly_events.events) as events
        FROM public.poi
        INNER JOIN public.hourly_stats
        ON public.hourly_stats.poi_id = public.poi.poi_id
        INNER JOIN public.hourly_events
        ON public.hourly_events.poi_id = public.poi.poi_id
        AND public.hourly_events.date = public.hourly_stats.date
        AND public.hourly_events.hour = public.hourly_stats.hour
        GROUP BY public.poi.poi_id;
    `
    return next();
}