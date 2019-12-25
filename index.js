const conn = require('./model');
const express = require('express');
const path = require('path');
const exhbs = require('express-handlebars');
const bodyparser = require('body-parser');
const app = express();
const crsCntrl = require('./controller/courses');

app.use(bodyparser.urlencoded({extended: true}))

app.set('views', path.join(__dirname, '/views/'));

app.engine('hbs', exhbs({
    extname: 'hbs',
    defaultLayout: 'mainlayout',
    layoutsDir: __dirname + '/views/layouts'
}));

app.set('view engine', 'hbs');

app.get('/',(req,res)=>{
    res.render('index', {});
})

app.use('/course', crsCntrl);

app.get('/', (req, res)=>{
    res.send("<h1>hello there</h1>");
}).listen(3000,()=>{
    console.log("server started at port 3000");
})