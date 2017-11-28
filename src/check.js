'use strict'

const URL = require('url');  //处理url
const sha1 = require('sha1');	//加密处理
const querystring = require('querystring');	//字符串处理
const Wechat = require('./wechat');
const util = require('./util');
const xml2js = require('xml2js');

/*检查*/
function checkSignature(params, token) {
	var str = [token, params.timestamp, params.nonce].sort().join('');	//字典排序 
	var sha = sha1(str); //加密
	// console.log(sha === params.signature);
	return sha === params.signature; 
}


module.exports = function(opts){
	var wechat = new Wechat(opts);
	return function (req, res) {
				//获取signatrue等参数
				var params = querystring.parse(URL.parse(req.url).query);
				
				if(!checkSignature(params, opts.token)){
					//签名不正确
					// res.end('Signature failed');
				}

				if(req.method = 'GET'){
					// res.end(params.echostr + '');
				}
				/*文档说明数据通过POST方式传输
				  实测为GET方式传输？
				*/
				var postData = '';

				req.on('data', function(chunk){
					postData += chunk;
				});

				req.on('end', function(){
					console.log(postData);
					try{
						xml2js.parseString(postData,{trim:true},function(err,content){
						// console.log(util.parseXMLAsync(postData));
						// util.parseXMLAsync(postData)
						// 	.then(function(content){
							// console.log(typeof (yield util.parseXMLAsync(postData)));//error
								var message = util.formatMessage(content.xml);
								// console.log(message);
								// var now = new Date().getTime();
								// if(message.MsgType === 'event'){
								// 	if(message.Event === 'subscribe'){
								// 		message.Content = '终于等到你的订阅~';
								// 	}
								// }
								// var response = '<xml>\
								// 					<ToUserName><![CDATA['+message.FromUserName+']]></ToUserName>\
								// 					<FromUserName><![CDATA['+message.ToUserName+']]></FromUserName>\
								// 					<CreateTime>'+now+'</CreateTime>\
								// 					<MsgType><![CDATA[text]]></MsgType>\
								// 					<Content><![CDATA['+message.Content+']]></Content>\
								// 				</xml>';
								// res.end(response);
									
							// });
						});
					} catch(err){
						// console.log(err);
						console.log(err);
						console.log('there is no msg');
					}
					
				});
			};
}