const fs = require('fs');

var https = require('https');

function TS_Chrome(chrome_name){
    let rawdata = fs.readFileSync('chromium-trust-store.json');
    let chr_data = JSON.parse(rawdata);
    const length = Object.keys(chr_data).length;

    for (let index = 0; index < length; index++) {
        var tem_ch = chr_data[index]['Subject'];
        var cn_s = tem_ch.split(',');
        var substring_cn = cn_s[0].substring(3,);

        if (substring_cn == chrome_name) {
            return true;
        }
    }
    return false;
}



function TS_FIrefox(firefox_name){
    let fireRdata = fs.readFileSync('firefox-trust-store.json');
    let fox_data = JSON.parse(fireRdata);
    const tam_fxdata = Object.keys(fox_data).length;

    for (let index = 0; index < tam_fxdata; index++) {
        var certificate_CN = fox_data[index]['Common Name or Certificate Name'];
        if(certificate_CN == firefox_name){
            return true;
        }
    }
    return false;
}



function TS_Edge(edge_name){
    let edgeRdata = fs.readFileSync('edge-trust-store.json');
    let edge_data = JSON.parse(edgeRdata);
    const tam_edge = Object.keys(edge_data).length;

    for (let index = 0; index < tam_edge; index++) {
        var certicateEg_name = edge_data[index]['CA Common Name or Certificate Name'];
        if (certicateEg_name == edge_name) {
            return true;
        }
    }
    return false;
}

module.exports = {
    TS_Chrome: TS_Chrome,
    TS_FIrefox: TS_FIrefox,
    TS_Edge: TS_Edge
}