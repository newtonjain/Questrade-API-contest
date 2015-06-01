var http = require('https');
var querystring = require('querystring');

var postData = querystring.stringify({
	grant_type: 'refresh_token',
	refresh_token: 'DpMxAaYgsv7a_B-gITOKxQBYTMZYbhdF0'
});

var options = {
	hostname: 'login.questrade.com',
	path: '/oauth2/token?' + postData,
	method: 'POST'
};

var request = http.request(options, function(response) {
	response.on('data', function(data) {
		console.log('data', data.toString());
	});
});

console.log(postData);
request.write(postData);
request.end();

// {"access_token":"xQAEohu1pgcW-qheEERZj4M_AIjgZVlU0","api_server":"https:\/\/api02.iq.questrade.com\/","expires_in":1800,"refresh_token":"DpMxAaYgsv7a_B-gITOKxQBYTMZYbhdF0","token_type":"Bearer"}

data = [
]