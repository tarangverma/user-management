const fs = require('fs');
const pg = require('pg');
const url = require('url');

const config = {
    user: "avnadmin",
    password: "AVNS_hFQnKakK9zashWFI_8M",
    host: "pg-1bc03c61-usermanagement.b.aivencloud.com",
    port: 23156,
    database: "defaultdb",
    ssl: {
        rejectUnauthorized: true,
        ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUc59AOPpIyHZ4hLpN++7YlP3wIqowDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvMzRkMDI0M2MtMjliMS00MGU2LTg3NGQtMWJjYTc0MjM1
MWI1IFByb2plY3QgQ0EwHhcNMjQxMTIzMDYwMTI4WhcNMzQxMTIxMDYwMTI4WjA6
MTgwNgYDVQQDDC8zNGQwMjQzYy0yOWIxLTQwZTYtODc0ZC0xYmNhNzQyMzUxYjUg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAMQp9S6L
X/0l7ZX7s1/uPmP96MJk1e2eSmAGIU/imtcYn7n0m2pB87PiW+ph91H9Lvuq4DyB
EdEZoQx1WVmZuzk+vcb3d1BVJP9uRaEsOgx1CN3zv/Ti9jjXE2+7NMEKU30j9srm
hpqtvfyVcdti62g/WFDLKc2CCJRAfYB5jWL+JmavrmSwYXZdJj3nsLm+0Slpirhf
2uN5JgfKM0J4EAf/Dawg1Tf0gh5rOTPwi5DhTC10x6HfQsMCj8aCg+c3K6aita4U
zaKfDnAwzdTBf0U02ND8LIhGOKmtvs4gEx0572tiBWn6v99gpfxx4yff8w+pEKMg
QGJBoE1xFsfCboPT+f8voPm7JxO/4dfqAbF3hDX/qKWAlarJJYYurrVKk8/IDZod
ZymZ3B8llJoHi5bQngMDbXWTnrqrqzoPEBFFb5nffF87ipk3pfCFajcWVVXi9QGc
/OwGnZrSYtg4Z4jlQvRJS2sS3gVZPA+vQHawUSZHaV+61YWyHHupaSdBBQIDAQAB
oz8wPTAdBgNVHQ4EFgQUHmv4xP/SM5hKp7IVXPOrDpYXRMAwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAEk7mrj68ItSvvfU
EvJfLLi706ugnpnFFkNFHc3vvLUQmHR8GaZ2BZ+pD+WR7dnYo9rGFAzsKmak0IXB
6SoOdmygSXyzJ4z/eLw7IZGVpwwCnjDr2L4DkkQE3X6IsN0rPaEwe99bVjhTEDUE
dGfLw+/ecZZODOuJXUFxbzCiGybc6K+t8kEFglE2ZNlK0iu5cLnXuJbdGC9TSQuY
8S1voI6c7w6dCQse7FLRSvjY+tfSCUrcSOb0YLUzCdn2ZcaQ3yYs1PuGmzBc98MD
oJB55rzkA+CoyK4Hlig16DWOYAPQedwb69o1tkU41hNY6KIhDFnHPcsaq7fBIGZq
T9JhE1isZoep+gyCcrZKuI6fhi6rHXXe6oKOO+kvgaw9nJ5zOadPDTX+Pqt2WRfg
xPDaSNyaflo28bX5a2kTBgMHrav+nU2pM+zWWMEyfhQhVHAEohd4/nkhJAMd2l8I
+yrDZG2yzC5tJQR+sn9sUjTbjL3+acL3ELjw/nlhBVx4MQg3wg==
-----END CERTIFICATE-----`,
    },
};

const pool = new pg.Pool(config);
pool.connect(function (err) {
    if (err)
        console.log(err);
    pool.query("SELECT VERSION()", [], function (err, result) {
        if (err)
            console.log(err);

        console.log(result.rows[0].version);
    });
});

module.exports = pool;
