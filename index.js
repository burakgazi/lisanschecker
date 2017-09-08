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
    },
    defaultLayout: 'main'
});


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


// Main route
app.get('/', (req, res, next) => {
    res.render('index');
    return;
});
app.get('/help', (req, res, next) => {
    res.render('help');
    return;
});
// Result route
app.post('/checkList', (req, res, next) => {
    // CSV to json object
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
    // Get the results
    return checkList(listFormated, (err, result) => {
        res.render('result', { result });
        return;
    });
});

app.listen(3000, () => {
    console.log('Example app listening on port 80!');
});
