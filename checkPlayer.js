const async = require('async');
const getlist = require('./getList');
const phantominstance = require('./phantm');


module.exports = (ad, soyad, callback) => {
    const variations = [];
    variations.push({
        ad,
        soyad,
        aktif: 1, //0 tumu'
        lisans: 1,
        lisansCode: 'P'
    });
    variations.push({
        ad,
        soyad,
        aktif: 1, // 0 tumu
        lisans: 2,
        lisansCode: 'A'
    });
    async.map(variations,
        function herOpsiyon(param, cb) {
            getlist(phantominstance(), param, (result) => {
                return cb(null, { param: param, result: result });
            });
        }, function bitti(err, resCol) {
            if (err) {
                return callback(err);
            }
            for (let a = 0; a < resCol.length; a++) {
                if (resCol[a].result === undefined) { resCol[a].result = false; }
            }
            if (!resCol.length === 0) {
                return callback(null, 'Hiç bir kayıt bulunamadı');
            }

            const result = {
                ad: resCol[0].param.ad,
                soyad: resCol[0].param.soyad
            }
            result[resCol[0].param.lisansCode] = resCol[0].result;
            result[resCol[1].param.lisansCode] = resCol[1].result;
            return callback(null, result);
        });
};

