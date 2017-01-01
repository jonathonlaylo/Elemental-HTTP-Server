/*jshint esversion: 6*/
const http = require('http');
const fs = require('fs');
const PORT = process.env.PORT || 3000;

const server = http.createServer( (req, res) => {


});



server.listen(PORT, () => {
  console.log("server is listening on port", PORT);
});