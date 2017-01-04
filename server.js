/*jshint esversion: 6*/
const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const PORT = process.env.PORT || 3000;

const fileNotFoundErrorHandler = (res) => {
  res.statusCode = 500;
  res.end('Server is broken');
};

const sendContent = (res, content) => {
  res.setHeader('Content-Type', 'text/plain');
  res.write(content);
  res.end();
};

const resourceMapping = {
  '/helium.html' : './public/helium.html',
  '/hydrogen.html' : './public/hydrogen.html',
  '/index.html' : './public/index.html',
  '/styles.css' : "./public/css/styles.css"
};

const server = http.createServer( (req, res) => {
  if (req.method === "GET"){
    if(req.url === '/'){
      req.url = '/index.html';
    }

    console.log("req.url", req.url);
    console.log("req.method", req.method);
    console.log("req.headers", req.headers);

    fs.readFile(resourceMapping[req.url] || '', (err, content) => {
      if(err){
        res.statusCode = 404;
        sendContent(res, 'Resource not found');
        return;
      }
      sendContent(res, content);
    });
  }
  if (req.method === "POST"){
    let reqBody = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => {
      reqBody = chunk;
      // console.log('reqBody',reqBody);
      let reqParsedData = querystring.parse(reqBody);
      // console.log(reqParsedData);
      let fileName = './public/' + reqParsedData.elementName.toLowerCase() + '.html';
      // console.log(fileName);
      let fileHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Elements - ${reqParsedData.elementName}</title>
  <link rel ="stylesheet" href="/css/styles.css">
</head>
<body>
  <h1>${reqParsedData.elementName}</h1>
  <h2>${reqParsedData.elementSymbol}</h2>
  <h3>Atomic number ${reqParsedData.elementAtomicNumber}</h3>
  <p>${reqParsedData.elementDescription}</p>
  <p><a hred="/">back</a></p>
</body>
</html>`;
      console.log(fileHTML);


    });
    // req.on('end', () => {
    //   console.log('reqBody',reqBody.toString());
    // });
  }

});


server.listen(PORT, () => {
  console.log("server is listening on port", PORT);
});