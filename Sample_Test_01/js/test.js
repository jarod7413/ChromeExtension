function httpRequest(url,callback) {
	var xhr	=	new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function()	{
		if (xhr.readyState == 4) {
			callback(xhr.responseText);
		}
	}
	xhr.send();
}

var html;
httpRequest('test.txt', function(result){
	html = result;
	console.log(html);
});
