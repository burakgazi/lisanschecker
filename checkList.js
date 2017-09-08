const async = require('async');
const checkPlayer = require('./checkPlayer');

module.exports = (list, callback) => {
    async.map(list, function everyPlayer(player, cb) {
        return checkPlayer(player.ad, player.soyad, (cperrerr, cpresult) => {
            if (cperrerr) {
                return cb(cperrerr);
            }
            return cb(null, cpresult);
        });
    }, function finis(err, result) {
        return callback(err, result);
    })
}