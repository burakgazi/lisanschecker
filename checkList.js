const async = require('async');
const checkPlayer = require('./checkPlayer');

/**
 * Gets the list and searches for all names from the tff website
 */
module.exports = (list, callback) => {
    async.map(list, function everyPlayer(player, cb) {
        return checkPlayer(player.ad, player.soyad, (cperrerr, cpresult) => {
            if (cperrerr) {
                return cb(cperrerr);
            }
            return cb(null, cpresult);
        });
    }, (err, result) => {
        callback(err, result);
    })
}