const express = require('express');
const checkList = require('./checkList');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

// Handlebars helpers
var hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        ifCond: function (v1, v2, options) {
            if (v1 || v2) {
                return options.fn(this);
            }
            return options.inverse(this);
        },
        varyok: function (v, options) {
            if (v) {
                return 'VAR';
            }
            return 'YOK';
        },
    }
});


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');



app.get('/', (req, res, next) => {
    res.send('<html><head></head><body><form action="/checkList" method="post"><textarea name="txtListe" type="text"> </textarea><input type="submit" value="submit"></input></form></body></html>');
    return next();
});

app.post('/checkList', (req, res, next) => {
    const list = req.body.txtListe.split('\n');
    const listFormated = [];
    const headers = list[0].split(';');
    for (var i = 1; i < list.length; i++) {
        const data = list[i].split(';');
        const obj = {};
        for (var j = 0; j < data.length; j++) {
            obj[headers[j].trim()] = data[j].trim();
        }
        listFormated.push(obj);
    }
    JSON.stringify(listFormated);

    return checkList(listFormated, (err, result) => {
        res.render('result', { result, layout: false });
        return;
    });
});

app.listen(80, () => {
    console.log('Example app listening on port 3000!');
});
