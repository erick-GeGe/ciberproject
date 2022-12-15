var express = require('express')
var cors = require('cors');
var https = require('https');
const { TS_Chrome, TS_FIrefox, TS_Edge } = require('./buscador_trsustore.js')
const fs = require('fs');

var app = express()
app.use(express.json())
app.use(cors())

var port = 3000

function analizarurl(url) {
	var Cont_nivelCh = 0;
	var Cont_nivelFx = 0;
	var Cont_nivelEg = 0;
	var chCer = false;
	var fxCer = false;
	var egCer = false;
	let newJson = {}
	
	try {
		url = url.split('http://')
		if (url.length == 1) {
			url = url[0].split('https://')
		}
		url = url[1]
		url = url.split('/')[0]

		var options = {
			host: url,
			port: 443,
			method: 'GET'
		};
	} catch (error) {
		newJson = {
			'url': 'Ocurrio un error',
			'edge_l': '0',
			'firefox_l': '0',
			'chrome_l': '0',
			'certificates': []
		}
		res.json(newJson);
		return;
	}

	const setnewjson = (Cont_nivelCh, Cont_nivelFx, Cont_nivelEg, certs) =>{
		newJson =  {
			url,
			'edge': Cont_nivelCh,
			'firefox': Cont_nivelFx,
			'chrome': Cont_nivelEg,
			'certificates': certs
		}
		return true;
	}

	const request = https.request(options, function (res2) {
		let cert = res2.connection.getPeerCertificate(true);
		let list = new Set();
		let certs = []

		if (res2.socket.authorized == true) {
			Cont_nivelCh++;
			Cont_nivelFx++;
			Cont_nivelEg++;
		}
		let count = 1;
		do {
			list.add(cert);
			let certicate = {
				'cert': count,
				'subject': cert.subject['CN'],
				'issuer': cert.issuer['CN'],
				'periodo': cert.valid_from + ' ' + cert.valid_to,
				'info': cert.issuerCertificate['fingerprint'].substring(0, cert.issuerCertificate['fingerprint'].length / 2) + ' ' + cert.issuerCertificate['fingerprint'].substring(cert.issuerCertificate['fingerprint'].length / 2, cert.issuerCertificate['fingerprint'].length),
				'constraints': cert.issuerCertificate['serialNumber']
			}
			certs.push(certicate)
			count++;
			isuer_final = cert.issuer;
			var nuevo_cer = cert.issuerCertificate
			cert = cert.issuerCertificate;
		} while (cert && typeof cert === "object" && !list.has(cert));

		var sub_CertifName = JSON.stringify(isuer_final['CN']);
		sub_CertifName = sub_CertifName.substring(1, sub_CertifName.length - 1);
		chCer = TS_Chrome(sub_CertifName);
		fxCer = TS_FIrefox(sub_CertifName);
		egCer = TS_Edge(sub_CertifName);

		if (chCer == true) {
			Cont_nivelCh++;
		}
		if (fxCer == true) {
			Cont_nivelFx++;
		}
		if (egCer == true) {
			Cont_nivelEg++;
		}
		// var seturldone = setnewjson(Cont_nivelCh, Cont_nivelFx, Cont_nivelEg, certs);
		console.log(newJson)
		newJson =  {
			url,
			'edge': Cont_nivelCh,
			'firefox': Cont_nivelFx,
			'chrome': Cont_nivelEg,
			'certificates': certs
		}
		console.log(newJson)
	});
	console.log(newJson)
	request.end();
	return newJson;
}

app.post('/url', function (req, res) {
	let url = req.body.url;
	let newjson = analizarurl(url) 
	console.log(newjson)
	res.json(newjson)
})

app.post('/urls', function (req, res) {
	var urls = req.body.urls;
	urls = urls.split(/\r?\n/);
	urls.pop()
	var newJson = urls.map(url => {

		var Cont_nivelCh = 0;
		var Cont_nivelFx = 0;
		var Cont_nivelEg = 0;
		var chCer = false;
		var fxCer = false;
		var egCer = false;

		try {
			url = url.split('http://')
			if (url.length == 1) {
				url = url[0].split('https://')
			}
			url = url[1]
			url = url.split('/')[0]

			var options = {
				host: url,
				port: 443,
				method: 'GET'
			};
		} catch (error) {
			return {
				'url': 'Ocurrio un error',
				'edge_l': '0',
				'firefox_l': '0',
				'chrome_l': '0',
				'certificates': []
			}
		}

		var newurljson = {}
		const request = https.request(options, function (res2) {
			let cert = res2.connection.getPeerCertificate(true);
			let list = new Set();
			let certs = []

			if (res2.socket.authorized == true) {
				Cont_nivelCh++;
				Cont_nivelFx++;
				Cont_nivelEg++;
			}
			let count = 1;
			do {
				list.add(cert);
				let certicate = {
					'cert': count,
					'subject': cert.subject['CN'],
					'issuer': cert.issuer['CN'],
					'periodo': cert.valid_from + ' ' + cert.valid_to,
					'info': cert.issuerCertificate['fingerprint'].substring(0, cert.issuerCertificate['fingerprint'].length / 2) + ' ' + cert.issuerCertificate['fingerprint'].substring(cert.issuerCertificate['fingerprint'].length / 2, cert.issuerCertificate['fingerprint'].length),
					'constraints': cert.issuerCertificate['serialNumber']
				}
				certs.push(certicate)
				count++;
				isuer_final = cert.issuer;
				var nuevo_cer = cert.issuerCertificate
				cert = cert.issuerCertificate;
			} while (cert && typeof cert === "object" && !list.has(cert));

			var sub_CertifName = JSON.stringify(isuer_final['CN']);
			sub_CertifName = sub_CertifName.substring(1, sub_CertifName.length - 1);
			chCer = TS_Chrome(sub_CertifName);
			fxCer = TS_FIrefox(sub_CertifName);
			egCer = TS_Edge(sub_CertifName);

			if (chCer == true) {
				Cont_nivelCh++;
			}
			if (fxCer == true) {
				Cont_nivelFx++;
			}
			if (egCer == true) {
				Cont_nivelEg++;
			}

			newurljson = {
				url,
				'edge': Cont_nivelCh,
				'firefox': Cont_nivelFx,
				'chrome': Cont_nivelEg,
				'certificates': certs
			}
			console.log(newurljson)
		});
		request.end();
		console.log(newurljson)


		const certificates = []
		var cert1 = {
			cert: "test",
			subject: "test name",
			issuer: "test issuer",
			periodo: "test periodo",
			info: "test info",
			constraints: "test constraints"
		}
		var cert2 = {
			cert: "test 2",
			subject: "test name 2",
			issuer: "test issuer 2",
			periodo: "test periodo 2",
			info: "test info 2",
			constraints: "test constraints 2"
		}
		certificates.push(cert1)
		certificates.push(cert2)
		const edge_l = Math.floor(Math.random() * (3) + 1)
		const firefox_l = Math.floor(Math.random() * (3) + 1)
		const chrome_l = Math.floor(Math.random() * (3) + 1)
		return {
			url,
			edge_l,
			firefox_l,
			chrome_l,
			certificates
		}
	})
	res.json(newJson);
})


app.get('/get_trust_store_chrome', function (req, res) {
	var rawdata = fs.readFileSync('chromium-trust-store.json');
	res.json(JSON.parse(rawdata));
})

app.get('/get_trust_store_edge', function (req, res) {
	var rawdata = fs.readFileSync('edge-trust-store.json');
	res.json(JSON.parse(rawdata));
})

app.get('/get_trust_store_firefox', function (req, res) {
	var rawdata = fs.readFileSync('firefox-trust-store.json');
	res.json(JSON.parse(rawdata));
})

async function comprobarCer(chCer, fxCer, egCer) {
	if (chCer == true) {
		Cont_nivelCh++;
	}
	if (fxCer == true) {
		Cont_nivelFx++;
	}
	if (egCer == true) {
		Cont_nivelEg++;
	}
}



app.listen(port)
console.log('API escuchando en el puerto ' + port)