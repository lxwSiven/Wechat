var http = require('http');
var check = require('./src/check');
var path = require('path');
var util = require('./lib/util');

var wechat_file = path.join(__dirname, './config/wechat.txt')

var config = {
	wechat: {
		appId:'wxe2891d36bf46c6e3',
		appSecret:'6f5b28be458d38e5178b75ad5bfa59be',
		token:'lxwSivenandnoIdea21fdsel',
		encodingAESKey:'dId2fkdNXV0Us841odfbWL7vpQc6wANfgiAFddfRw1f',
		getAccessToken: function () {
        //通过这个来实现获取access_token
            return util.readFileAsync(wechat_file)
        },
	    saveAccessToken: function (data) {
	        data = JSON.stringify(data)
	        //通过这个来保存access_token
	        return util.writeFileAsync(wechat_file,data)
	    }
	}
};


var server = http.createServer(check(config.wechat));

server.listen(1234, function(){
	console.log('Server running at localhost:1234');
});