const http = require("http");
const dateTimeET = require("./src/dateTimeET.js");

const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Mia Liisa Toots, veevbiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBody = '\t<h1>Mia Liisa Toots, veebiprogrammeerimine</h1>\n\t <p>See leht on loodud õppetöö raames ja ei sisalda olulist või isegi tõsiseltvõetavalt sisu.</p> <p>Leht on koostatud <a href="https://tlu.ee">Tallinna Ülikoolis</a>, Digithnoloogiate instutuudi veebiprogrammeerimise kursusel.</p> <p>Lehele saan ka ülikoolist eemal olles ligi <3. Vabaajal olen kulturist ning mulle meeldib heegeldad, lugeda, arvutimänge mängida. Samuti mulle väga meedlib Neymar Jr, BMW, hardstyle muusika ja tattoos.</p>\n\t<hr>';
const dateInfo = "<p>Nädalapäev: " + dateTimeET.weekDay() + "</p>" + "<p>Kuupäev: " + dateTimeET.date(1) + "</p>" + "<p>Kellaaeg: " + dateTimeET.time() + "</p>";
const pageFoot = "\n</body>\n</html>";

http.createServer(function(req, res){
	res.writeHead(200, {"Content-type": "text/html"});
	//res.write('Veebiserver käivitus!');
	res.write(pageHead);
	res.write(pageBody);
	res.write(dateInfo);
	res.write(pageFoot);
	return res.end();
}).listen(5222);