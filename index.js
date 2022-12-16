var express = require('express')
var cors = require('cors');
var https = require('https');
const _importDynamic = new Function('modulePath', 'return import(modulePath)');
const fetch = async function (...args) {
	const { default: fetch } = await _importDynamic('node-fetch');
	return fetch(...args);
}

const { TS_Chrome, TS_FIrefox, TS_Edge } = require('./buscador_trsustore.js')
const fs = require('fs');

var app = express()
app.use(express.json())
app.use(cors())

var port = 443

app.post('/url', function (req, res) {
	let url = req.body.url;

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
		var newJson = {
			'url': 'Ocurrio un error',
			'edge_l': '0',
			'firefox_l': '0',
			'chrome_l': '0',
			'certificates': []
		}
		res.json(newJson);
		return;
	}
	const request = https.request(options, async function (res2) {
		let cert = res2.connection.getPeerCertificate(true);
		let list = new Set();
		let certs = []

		if (res2.socket.authorized == true) {
			Cont_nivelCh++;
			Cont_nivelFx++;
			Cont_nivelEg++;
		}
		let count = 0;
		do {
			list.add(cert);
			count++;
			isuer_final = cert.issuer;
			var nuevo_cer = cert.issuerCertificate
			cert = cert.issuerCertificate;
			let certicate = {
				'cert': count,
				'subject': cert.subject['CN'],
				'issuer': cert.issuer['CN'],
				'periodo': cert.valid_from + ' ' + cert.valid_to,
				'info': cert.issuerCertificate['fingerprint'].substring(0, cert.issuerCertificate['fingerprint'].length / 2) + ' ' + cert.issuerCertificate['fingerprint'].substring(cert.issuerCertificate['fingerprint'].length / 2, cert.issuerCertificate['fingerprint'].length),
				'constraints': cert.issuerCertificate['serialNumber']
			}
			certs.push(certicate)
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

		var newJson = {
			url,
			'edge_l': Cont_nivelCh,
			'firefox_l': Cont_nivelFx,
			'chrome_l': Cont_nivelEg,
			'certificates': certs
		}
		res.json(newJson);
	});
	request.end();
})

app.post('/urls', async function (req, res) {
	var urls = req.body.urls;
	urls = urls.split(/\r?\n/);
	urls.pop()
	var newJson = await Promise.all(urls.map(async url => {
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			},
			body: JSON.stringify({ url })
		};
		const response = await fetch('http://localhost:3000/url', requestOptions);
		const data = await response.json();
		return data
	}))
	// console.log(newJson)
	res.json(newJson);
})


app.get('/get_trust_store_chrome', function (req, res) {
	var rawdata = fs.readFileSync('chromium-trust-store.json');
	let chr_data = JSON.parse(rawdata);
	const length = Object.keys(chr_data).length;
	const type_key = 'SHA'
	const length_key = '256 bits'

	let certs = []
	let newestcerts_idx = []
	let oldestcerts_idx = []
	let newestcerts = []
	let oldestcerts = []
	for (let i = 0; i < 3; i++) {
		let newest = 0;
		for (let index = 1; index < length; index++) {
			let b_dates = chr_data[newest]['NotBefore'].split('-');
			let c_dates = chr_data[index]['NotBefore'].split('-');
			if (parseInt(c_dates[0]) <= parseInt(b_dates[0]))
				if (parseInt(c_dates[1]) <= parseInt(b_dates[1]))
					if (parseInt(c_dates[2]) <= parseInt(b_dates[2])) {
						found = false;
						for (let j = 0; j < newestcerts_idx.length; j++)
							if (newestcerts_idx[j] == index)
								found = true;
						if (!found)
							newest = index;
					}
		}
		newestcerts_idx.push(newest)
	}
	for (let i = 0; i < 3; i++) {
		let olderst = 0;
		for (let index = 1; index < length; index++) {
			let b_dates = chr_data[olderst]['NotBefore'].split('-');
			let c_dates = chr_data[index]['NotBefore'].split('-');
			if (parseInt(c_dates[0]) >= parseInt(b_dates[0]))
				if (parseInt(c_dates[1]) >= parseInt(b_dates[1]))
					if (parseInt(c_dates[2]) >= parseInt(b_dates[2])) {
						found = false;
						for (let j = 0; j < oldestcerts_idx.length; j++)
							if (oldestcerts_idx[j] == index)
								found = true;
						if (!found)
							olderst = index;
					}
		}
		oldestcerts_idx.push(olderst)
	}
	for (let index = 0; index < length; index++) {
		var certi = {
			'certificate': chr_data[index]['Subject'],
			'since': chr_data[index]['NotBefore'],
			'to': chr_data[index]['NotAfter']
		};
		certs.push(certi);
	}
	for (let index = 0; index < 3; index++) {
		var n_certi = {
			'certificate': chr_data[newestcerts_idx[index]]['Subject'],
			'since': chr_data[newestcerts_idx[index]]['NotBefore'],
			'to': chr_data[newestcerts_idx[index]]['NotAfter']
		};
		var o_certi = {
			'certificate': chr_data[oldestcerts_idx[index]]['Subject'],
			'since': chr_data[oldestcerts_idx[index]]['NotBefore'],
			'to': chr_data[oldestcerts_idx[index]]['NotAfter']
		};
		newestcerts.push(n_certi);
		oldestcerts.push(o_certi)
	}

	let newJson = {
		'length': length,
		type_key,
		length_key,
		newestcerts,
		oldestcerts,
		'allcerts': certs
	}
	res.json(newJson);
})

app.get('/get_trust_store_edge', function (req, res) {
	var rawdata = fs.readFileSync('edge-trust-store.json');
	let chr_data = JSON.parse(rawdata);
	const length = Object.keys(chr_data).length;
	const type_key = 'RSA'
	const length_key = '2048 bits'

	let certs = []
	let newestcerts_idx = []
	let oldestcerts_idx = []
	let newestcerts = []
	let oldestcerts = []
	for (let i = 0; i < 3; i++) {
		let newest = 0;
		for (let index = 1; index < length; index++) {
			let b_dates = chr_data[newest]['Valid From [GMT]'].split(' ');
			let c_dates = chr_data[index]['Valid From [GMT]'].split(' ');
			if (parseInt(c_dates[0]) <= parseInt(b_dates[0])) {
				found = false;
				for (let j = 0; j < newestcerts_idx.length; j++)
					if (newestcerts_idx[j] == index)
						found = true;
				if (!found)
					newest = index;
			}
		}
		newestcerts_idx.push(newest)
	}
	for (let i = 0; i < 3; i++) {
		let olderst = 0;
		for (let index = 1; index < length; index++) {
			let b_dates = chr_data[olderst]['Valid From [GMT]'].split(' ');
			let c_dates = chr_data[index]['Valid From [GMT]'].split(' ');
			if (parseInt(c_dates[0]) >= parseInt(b_dates[0])) {
				found = false;
				for (let j = 0; j < oldestcerts_idx.length; j++)
					if (oldestcerts_idx[j] == index)
						found = true;
				if (!found)
					olderst = index;
			}
		}
		oldestcerts_idx.push(olderst)
	}
	for (let index = 0; index < length; index++) {
		var certi = {
			'certificate': chr_data[index]['CA Common Name or Certificate Name'],
			'since': chr_data[index]['Valid From [GMT]'],
			'to': chr_data[index]['Valid To [GMT]']
		};
		certs.push(certi);
	}
	for (let index = 0; index < 3; index++) {
		var n_certi = {
			'certificate': chr_data[newestcerts_idx[index]]['CA Common Name or Certificate Name'],
			'since': chr_data[newestcerts_idx[index]]['Valid From [GMT]'],
			'to': chr_data[newestcerts_idx[index]]['Valid To [GMT]']
		};
		var o_certi = {
			'certificate': chr_data[oldestcerts_idx[index]]['CA Common Name or Certificate Name'],
			'since': chr_data[oldestcerts_idx[index]]['Valid From [GMT]'],
			'to': chr_data[oldestcerts_idx[index]]['Valid To [GMT]']
		};
		newestcerts.push(n_certi);
		oldestcerts.push(o_certi)
	}

	let newJson = {
		'length': length,
		type_key,
		length_key,
		newestcerts,
		oldestcerts,
		'allcerts': certs
	}
	res.json(newJson);
})

app.get('/get_trust_store_firefox', function (req, res) {
	var rawdata = fs.readFileSync('firefox-trust-store.json');
	let chr_data = JSON.parse(rawdata);
	const length = Object.keys(chr_data).length;
	const type_key = 'RSA'
	const length_key = '4096 bits'

	let certs = []
	let newestcerts_idx = []
	let oldestcerts_idx = []
	let newestcerts = []
	let oldestcerts = []
	for (let i = 0; i < 3; i++) {
		let newest = 0;
		for (let index = 1; index < length; index++) {
			let b_dates = chr_data[newest]['Valid From [GMT]'].split('.');
			let c_dates = chr_data[index]['Valid From [GMT]'].split('.');
			if (parseInt(c_dates[0]) <= parseInt(b_dates[0])) {
				found = false;
				for (let j = 0; j < newestcerts_idx.length; j++)
					if (newestcerts_idx[j] == index)
						found = true;
				if (!found)
					newest = index;
			}
		}
		newestcerts_idx.push(newest)
	}
	for (let i = 0; i < 3; i++) {
		let olderst = 0;
		for (let index = 1; index < length; index++) {
			let b_dates = chr_data[olderst]['Valid From [GMT]'].split('.');
			let c_dates = chr_data[index]['Valid From [GMT]'].split('.');
			if (parseInt(c_dates[0]) >= parseInt(b_dates[0])) {
				found = false;
				for (let j = 0; j < oldestcerts_idx.length; j++)
					if (oldestcerts_idx[j] == index)
						found = true;
				if (!found)
					olderst = index;
			}
		}
		oldestcerts_idx.push(olderst)
	}
	for (let index = 0; index < length; index++) {
		var certi = {
			'certificate': chr_data[index]['Certificate Issuer Organization'],
			'since': chr_data[index]['Valid From [GMT]'],
			'to': chr_data[index]['Valid To [GMT]']
		};
		certs.push(certi);
	}
	for (let index = 0; index < 3; index++) {
		var n_certi = {
			'certificate': chr_data[newestcerts_idx[index]]['Certificate Issuer Organization'],
			'since': chr_data[newestcerts_idx[index]]['Valid From [GMT]'],
			'to': chr_data[newestcerts_idx[index]]['Valid To [GMT]']
		};
		var o_certi = {
			'certificate': chr_data[oldestcerts_idx[index]]['Certificate Issuer Organization'],
			'since': chr_data[oldestcerts_idx[index]]['Valid From [GMT]'],
			'to': chr_data[oldestcerts_idx[index]]['Valid To [GMT]']
		};
		newestcerts.push(n_certi);
		oldestcerts.push(o_certi)
	}

	let newJson = {
		'length': length,
		type_key,
		length_key,
		newestcerts,
		oldestcerts,
		'allcerts': certs
	}
	res.json(newJson);
})

app.listen(port)
console.log('API escuchando en el puerto ' + port)