const pool =  require('./connection');

exports.fetchRows = (req, res, next) => {
    pool.query(req.sqlQuery).then((r) => {
        return res.json(r.rows || [])
    }).catch(next)
}