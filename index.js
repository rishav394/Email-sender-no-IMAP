var express = require('express');
var bodyParser = require('body-parser');
var mailSender = require('./MailSender');
var cors = require('cors');
var favicon = require('serve-favicon');

var app = express();
var port = process.env.PORT || 100;

var urlEncodedParser = bodyParser.urlencoded({
	extended: false,
});

var jsonParser = bodyParser.json();

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(urlEncodedParser);
app.use(cors());
app.use(express.static('public'));

app.post('/', (req, res) => {
	res.type('text/plain');
	var frm = req.body.from;
	var to = req.body.address;
	var text = req.body.message;
	var subject = req.body.subject;
	mailSender.send(frm, to, subject, text, function cb(response, code) {
		res.status(code);
		res.send(response);
	});
});

app.use(function(req, res, next) {
	console.log(req.url);
	res.status(404);
	res.type('txt').send('Not found');
});

app.listen(port, () => {
	console.log('App listening on port ' + port);
});
