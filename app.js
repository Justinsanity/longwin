var express = require('express');
var bodyParser = require('body-parser');
var mailer = require('nodemailer');
var log = require('npmlog');
var moment = require('moment');

/* configurations */
var app = express();
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded (e.g. POST body)
app.use(bodyParser.json()); // parse application/json

/* routers */
app.get('/', function(req, res){
  res.redirect('http://longwin.tw');
});
app.get('/order', function (req, res) {
  res.render('order', { title: '線上訂購 - 龍吟商行 Longwin'});
});
app.get('/mail', function (req, res) {
  res.render('mail', { title: '聯絡我們 - 龍吟商行 Longwin'});
});
app.post('/order2', function(req, res){
  res.render('order2', { 
    title: '訂單確認 - 龍吟商行 Longwin',
    name: req.body.name,
    goods: req.body.goods,
    count: req.body.count,
    phone: req.body.phone,
    email: req.body.email,
    addr: req.body.addr
  });
});
app.get('/order3', function(req, res){
    res.render('order3');
});
app.post('/order3', function(req, res){
    
    var title = '完成訂購 - 龍吟商行 Longwin',
    name = req.body.name,
    goods = req.body.goods,
    count = req.body.count,
    phone = req.body.phone,
    email =  req.body.email,
    addr = req.body.addr,
    time = moment(Date.now() + 28800000).format('YYYY-MM-DD HH:mm:ss') +'(TPE)', // convert UTC milliseconds to TPE time (+8 hr)
    ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    
    /* tmp: 開發測試中紀錄誤送單來源 */
    logger(1, 'IP: '+ip + '\nName:' + name + '\nPhone: ' + phone + '\nTime: ' + time);
    res.status(200).end();
    /*
    if(write_success)
        res.status(200).end(); //OK 
        // TODO: send a confirmation to inform a new order made by nodemailer(https://github.com/andris9/Nodemailer)
    else{
        res.status(500).end() // internal error
        // TODO: send log by npmlog()
        // and nodemailer(https://github.com/andris9/Nodemailer)
    }
    */
});

/* customized logger function */
var logger = function(code, message){
    /**
     * code:
     * 0 - (tmp reserved)
     * 1 - new order made
     * 2 - order system error
     */
     var subject = "";
     switch(code){
        case 0:
            subject = "All is well";
            break;
        case 1:
            subject = "New order made";
            break;
        case 2:
            subject = "Order system error";
            break;
        default:
            subject = "should not in here";
            break;
     }

    // Gmail is simple to setup but private, so we use AWS SES 
    // before we change Github plan to having it this repo private
     var transporter = mailer.createTransport({
         service: 'ses',
         host: 'email-smtp.us-west-2.amazonaws.com',
         auth: {
           user: 'AKIAIPA7QYPJYXXJDGJA',
           pass: 'AoVr5AU9oPFUsRELPCi57I3uFodRgiU3hRVl0Lpa45Zx'
         }
     });
     
     transporter.sendMail({
         from: 'fbukevin@gmail.com',
         to: 'fbukevin@gmail.com, ks661354@gmail.com',
         subject: subject,
         text: message
    });
}

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
