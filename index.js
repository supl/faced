'use strict';

const Hapi = require('hapi');
const fs = require('fs');
const path = require('path');

const server = new Hapi.Server();
server.connection({
    port: 3000,
    tls: {
        key: fs.readFileSync(path.join(__dirname, "example.key")),
        cert: fs.readFileSync(path.join(__dirname, "example.crt")),
    }
});

server.register(require('inert'), err => {
    if (err) {
        console.log(err);
    }
    server.route([
        {
            method: 'GET',
            path:'/',
            handler: function (request, h) {
                const c = fs.readFileSync(path.join(__dirname, 'public/index.html'), 'utf-8');
                return h.response(c).type('text/html');
            }
        },
        {
            method: 'GET',
            path: '/{param*}',
            handler: {
                directory: {
                    path: path.join(__dirname, 'public'),
                }
            }
        },
    ]);

    server.start();
    console.log('Server running at:', server.info.uri);
});

