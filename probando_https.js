const { time, Console } = require('console');
var https = require('https');
//importamos las libreria con json
const { TS_Chrome, TS_FIrefox, TS_Edge } = require('./buscador_trsustore.js')

//contador para medir nivel de seguridad en los exploradores
var Cont_nivelCh = 0;
var Cont_nivelFx = 0;
var Cont_nivelEg = 0;


//comprobates de certificados
var chCer = false;
var fxCer = false;
var egCer = false;



var options = {
    host: 'github.com',
    port: 443,
    method: 'GET'
};

//
var isuer_final;


const request = https.request(options, async function (res) {
    let cert = res.connection.getPeerCertificate(true);
    let list = new Set();
    console.log("statusCode: ", typeof (res.statusCode));
    if (res.statusCode == 200) {
        console.log("la pagina existe");
        let result = {'data': 0}
    }

    if (res.socket.authorized == true) {
        Cont_nivelCh = Cont_nivelCh + 1;
        Cont_nivelFx++;
        Cont_nivelEg++;
    }

    console.log('certificate authorized:' + res.socket.authorized);
    do {
        list.add(cert);
        // console.log("subject", cert.subject);
        // console.log("issuer", cert.issuer);
        // console.log("valid_from", cert.valid_from);
        // console.log("valid_to", cert.valid_to);
        // console.log(cert.issuerCertificate)
        isuer_final = cert.issuer;
        var nuevo_cer = cert.issuerCertificate
        cert = cert.issuerCertificate;
    } while (cert && typeof cert === "object" && !list.has(cert));

    var sub_CertifName = JSON.stringify(isuer_final['CN']);
    sub_CertifName = sub_CertifName.substring(1, sub_CertifName.length - 1);
    // setTimeout(chCer = TS_Chrome, 1500, sub_CertifName);
    // setTimeout(fxCer = TS_FIrefox, 1600, sub_CertifName);
    // setTimeout(egCer = TS_Edge, 1700, sub_CertifName);
    chCer = TS_Chrome(sub_CertifName);
    fxCer = TS_FIrefox(sub_CertifName);
    egCer = TS_Edge(sub_CertifName);

    await comprobarCer();
    Nivel_COnfianza(Cont_nivelCh);
    Nivel_COnfianza(Cont_nivelFx);
    Nivel_COnfianza(Cont_nivelEg);
});

request.end();


//comprabamos si el certifcador aiz esta en todas los trusstore
async function comprobarCer() {
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

//necesario ya ue no est an el request
// setTimeout(comprobarCer, 1800);

//prueba()
//function as (dolar){console.log(dolar)};
//setTimeout(as, 1000, isuer_final)
// setImmediate(prueba);
// setImmediate(TS_Chrome, "")
//setTimeout(TS_Chrome, 1500, nu);
//prueba().then(TS_Chrome('scsd'))
//TS_Chrome(JSON.stringify(isuer_final))


function Nivel_COnfianza(buscador_Con) {
    // console.log(buscador_Con)
    if (buscador_Con == 2) {
        console.log("es confiable");
    }
    else if (buscador_Con == 1) {
        console.log("no es muy confiable")
    }
    else {
        console.log("pagina insegura")
    }
}


// setTimeout(Nivel_COnfianza, 1950, Cont_nivelCh);
// setTimeout(Nivel_COnfianza, 1900, Cont_nivelFx);
// setTimeout(Nivel_COnfianza, 2000, Cont_nivelEg);