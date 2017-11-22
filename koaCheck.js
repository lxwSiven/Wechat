'use strict';

var Koa = require('koa');
var sha1 = require('sha1');
var config = {
	wechat: {
		appId:'wx2b3ac5d19df150ba',
		appSecret:'faeeec1e7e5c0661831604dce971736b',
		token:'lxwSivenandnoIdea*21fdselk'
	}
}

var app = new Koa();

app.use(function *(next){
	console.log(this.query);
	console.log(this)
	var token = config.wechat.token;
	var signature = this.query.signature;
	var nonce = this.query.nonce;
	var timestamp = this.query.timestamp;
	var echostr = this.query.echostr;
	var str = [token, timestamp, nonce].sort().join('');
	var sha = sha1(str);

	if (sha === signature){
		this.body = echostr + '';
	} else {
		this.body = 'wrong';
	}
});

app.listen(1234); 

console.log('Listening: 1234');