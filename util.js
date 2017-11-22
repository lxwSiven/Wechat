'use strict'

var xml2js = require('xml2js');

// module.exports.parseXMLAsync = function (xml){
// 		xml2js.parseString(xml,{trim:true}, function(err, content){
// 			if (err) {
// 				}else {
// 				return content;

// 			}
// 		});
// }
//未能理解如何将异步函数中的数据(content)暴露出去另一个模块中
module.exports.parseXMLAsync = function (xml){
	return new Promise(function(resolve, reject){
		xml2js.parseString(xml,{trim:true}, function(err, content){
			if (err) {
				reject(err);
			}else {
				resolve(content);
			}
		});
	});
}

function formatMessage(result){
	var message = {};
	if (typeof result === 'object'){
		var keys = Object.keys(result);
		// console.log(keys);
		for (var i = 0; i < keys.length; i ++){
			var item = result[keys[i]];
			var key = keys[i];
			if(!(item instanceof Array) || item.length === 0 ){
				continue;
			}
			if (item.length === 1) {
				var val = item[0];

				if (typeof val === 'object') {	
					message[key] = formatMessage(val);
				}else {
					message[key] = (val || '').trim();
				}
			}else {
				message[key] = [];
				for(var j = 0; j < item.length; j++){
					message[key].push(formatMessage(item[j]));
				} 
			}
		}
	}
	// console.log(message);
	return message;
}

 module.exports.formatMessage = formatMessage;