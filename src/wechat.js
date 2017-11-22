'use strict';

var https = require('https');
var prefix = 'https://api.weixin.qq.com/cgi-bin/';
var api = {
	accessToken: prefix + 'token?grant_type=client_credential'
}


function Wechat(opts){
	var that = this;
	this.appId = opts.appId;
	this.appSecret = opts.appSecret;
	this.getAccessToken = opts.getAccessToken;
	this.saveAccessToken = opts.saveAccessToken;
	this.getAccessToken()
		.then(function(data){
			try {
				data = JSON.parse(data);

			} catch(e){
				return that.updateAccessToken();
			}
			if (that.isValidAccessToken(data)){
				// return new Promise(function(resolve, reject){
				// 	resolve(data);
				// })

				return Promise.resolve(data);
			} else {
				return that.updateAccessToken();
			}
		})
		/*cathc、if、else中的return返回一个Promise*/
		.then(function(data){
			that.access_token = data.access_token;
			that.expires_in = data.expires_in;
			that.saveAccessToken(data); 
		})
}

Wechat.prototype.isValidAccessToken = function (data){
	if (!data.access_token || !data.expires_in ){
		return false;
	}
	
	var now = new Date().getTime();
	if(now < data.expires_in){
		return true;
	}else {
		return false;
	}
}

Wechat.prototype.updateAccessToken = function(){
	var appId = this.appId;
	var appSecret = this.appSecret;
	var url = api.accessToken + '&appid=' + appId + '&secret=' + appSecret;
	return new Promise(function(resolve, reject){
		// var options={
		// 	hostname:'api.weixin.qq.com',
		// 	path:'/cgi-bin/token?grant_type=client_credential&appid='+appId+'&secret='+appSecret,
		// 	method:'GET',
		// 	json: true
		// };
		https.get(url, function(res){
			var data = '';
			res.on('data', function(chunk){
				data += chunk;
			});
			res.on('end',function(chunk){
				data = JSON.parse(data);
				var now = (new Date().getTime());
	            var expires_in = now + (data.expires_in - 20) * 1000;
	            data.expires_in = expires_in;
	            resolve(data);
	            console.log('Get access_token successfully.');
			});
			
		}).on('error', function(err){
			reject(err);
		});
	});
}

module.exports = Wechat;