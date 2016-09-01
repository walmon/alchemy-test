'use strict';

require('dotenv').config({silent: true});

var server = require('./app');
var port = process.env.PORT || process.env.VCAP_APP_PORT 
|| 3001;

server.listen(port, function() {
  console.log('Servidor corriendo en: %d', port);
});