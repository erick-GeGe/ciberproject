var express = require('express')
var cors = require('cors');

var app = express()
app.use(express.json())
app.use(cors())

var port = 3000

app.post('/url', function (req, res) {
	const url = req.body.url;
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
	var newJson = {
		url, 
		edge_l,
		firefox_l,
		chrome_l,
		certificates
	}
	res.json(newJson);
})

app.post('/urls', function (req, res) {
	var urls = req.body.urls;
	urls = 	urls.split(/\r?\n/);
	urls.pop()
	var newJson = urls.map(url => {
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


app.listen(port)
console.log('API escuchando en el puerto ' + port)