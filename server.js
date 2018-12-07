/**
 * @description client 개발 환경 임시 server
 * 실행방법 : npm start
 */


const express = require('express');
const path = require('path');
const app = express();
const route = require('./router.js');
var cors = require('cors');

app.use(express.static(path.join(__dirname, '/')));


app.use(cors());
app.options('*', cors());
app.set('port', process.env.PORT || 8585);

app.all("/nsmg/tp9/tp9.1/public/api/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    return next();
});

app.all("/api/*", function (req, res, next) {
    if (req.method.toLowerCase() !== "options") {
        return next();
    }
    return res.send(204);
});

app.use('/', route);

app.use((req, res, next) => {
    res.status(404).send('일치하는 주소가 없습니다.');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server Error');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), ' on learning...')
})