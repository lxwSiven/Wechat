var https  = require('https');

var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx2b3ac5d19df150ba&secret=faeeec1e7e5c0661831604dce971736b';

https.get(url, function(res){
	var data = '';
	res.on('data',function(chunk){
		data += chunk;
	});
	res.on('end', function(){
		console.log(data);
		data = JSON.parse(data);
		console.log(data.expires_in)	;
	});
});


