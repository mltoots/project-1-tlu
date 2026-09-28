const http = require("http");
//mooduk URL-i parsimiseks	
const url = require('url')
//moodul failiteede haldamiseks
const path = require('path');
//const fs = require ('fs')
const fs = require ('fs').promises;
const dateTimeET = require("./src/dateTimeET.js");

const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Mia Liisa Toots, veevbiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBanner = '<img src="veebiprogrammeerimine_2026_ID.png" alt="bänner">\n';
const pageBody = '\t<h1>Mia Liisa Toots, veebiprogrammeerimine</h1>\n\t <p>See leht on loodud õppetöö raames ja ei sisalda olulist või isegi tõsiseltvõetavalt sisu.</p> <p>Leht on koostatud <a href="https://tlu.ee">Tallinna Ülikoolis</a>, Digithnoloogiate instutuudi veebiprogrammeerimise kursusel.</p> <p>Lehele saan ka ülikoolist eemal olles ligi <3. Vabaajal olen kulturist ning mulle meeldib heegeldad, lugeda, arvutimänge mängida. Samuti mulle väga meedlib Neymar Jr, BMW, hardstyle muusika ja tattoos.</p> <p>Pildil on minu kutsu, Desire, aga tema hüüdnimi on Dessi. Ta on 15 aastat vana, kuid ikkagist väga nunnu.</p>\n\t<hr>';
const pageFoot = "\n</body>\n</html>";
	
http.createServer(async function(req, res){
		//vaatan URL-i
		console.log('Päring: ' + req.url);
		//parsin URL-i
		let currentURL = url.parse(req.url, true)
		console.log('Parsituna: ' + currentURL.pathname);
		//console.log('Parsituna: ' + currentURL.port);
		
		if(currentURL.pathname === '/'){
			res.writeHead(200, {"Content-type": "text/html"});
			//res.write('Veebiserver käivitus');
			res.write(pageHead);
			res.write(pageBanner);
			res.write(pageBody);
			res.write('\n\t<img src="/Dessi.jpg" alt="foto" width="400">');
			res.write('\n\t<p>Täna on ' + dateTimeET.weekDay() + ', ' + dateTimeET.date(Math.round(Math.random())) + ', kell oli lehe avamise hetkel: ' + dateTimeET.time() +'.</p>');
			res.write('\n\t<p><a href="/minust">Miks tulin just TLÜ-sse õppima?</a></p>');
			res.write('\n\t<p><a href="/vanasona">Tänane vanasõna</a></p>'); 
			res.write(pageFoot);
			return res.end();
		}
		
		else if (currentURL.pathname === '/vanasona'){
			const data = await fs.readFile('./txt/vanasonad.txt', 'utf8');
			const vanasonad = data.split(';');
			const juhuslik = Math.floor(Math.random() * vanasonad.length);
			const vanasona = vanasonad[juhuslik];
			res.writeHead(200, {"Content-type": "text/html"});
			//res.write('Veebiserver käivitus');
			res.write(pageHead);
			res.write(pageBanner);
			res.write('\t<h1>Tänane eesti vanasõna</h1>\n\t<p>Siin näed tänaseks päevaks loositud vanasõna.</p>\n\t<hr>');
			res.write('\t<p>' + vanasona + '</p>');
			res.write('\t<p><a href="/">Tagasi avalehele</a></p>');
			res.write(pageFoot);
			return res.end();
		}
		
		else if (currentURL.pathname === '/minust'){
			res.writeHead(200, {"Content-type": "text/html; charset=utf8"});
			res.write(pageHead);
			res.write(pageBanner);
			res.write('\t<h1>Miks tulin just TLÜ-sse õppima?</h1>');
			res.write('\t<p>Ülikooli valides pidin tegema otsuse informaatika või füsioteraapia vahel. Kuid valisin informaatika, sest see huvitas mind rohkem ja näen end tulevikus just selles valdkonnas töötamas.</p>');
			res.write('\n\t<img src="/TLU.jpg" alt="Tallinna Ülikool" width="400">');
			res.write('\t<p><a href="/">Tagasi avalehele</a></p>');
			res.write(pageFoot);
			return res.end();
		}
		
		else if (currentURL.pathname === '/veebiprogrammeerimine_2026_ID.png'){
			//liidame kättesaamatu päris kataloog jms virtuaalseks failiteeks
			let bannerPath = path.join(__dirname, 'pic', currentURL.pathname);
			try {
				const data = await fs.readFile(bannerPath);
				res.writeHead(200, {"Content-type": "image/png"});
				return res.end(data);
			} catch (err) {
				res.writeHead(404, {"Content-type": "text/plain; charset=utf8"});
				return res.end('Pilti ei leitud!');
			}
		}
		
		else if (currentURL.pathname.endsWith('.jpg')){
			let imagePath = path.join(__dirname, 'pic', currentURL.pathname);
			try {
				const data = await fs.readFile(imagePath);
				res.writeHead(200, {"Content-type": "image/jpeg"});
				return res.end(data);
			} catch (err) {
				res.writeHead(404, {"Content-type": "text/plain; charset=utf8"});
				return res.end('Pilti ei leitud!');
			}
		}
		
		/* else if (currentURL.pathname === '/veebiprogrammeerimine_2026_ID.png'){
		//liidame kättesaamatu päris kataloog jms virtuaalseks failiteeks
		let bannerPath = path.join(__dirname, 'pic', currentURL.pathname);
		console.log('Bänneri failitee: ' + bannerPath);
		fs.readFile(bannerPath, (err, data)=>{
				if(err){
					throw(err);
				} else {
					res.writeHead(200, {"Content-type": "image/png"});
					res.end(data);
				}
			});
		} */

		else {
			res.writeHead(404, {"Content-type": "text/html; charset=utf8"});
			return res.end('Viga 404! Ei leia sellist lehte!');
		}
	
}).listen(5222);