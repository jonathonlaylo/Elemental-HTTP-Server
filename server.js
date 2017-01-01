/*jshint esversion: 6*/
const http = require('http');
const fs = require('fs');
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
  if(req.url === '/'){
    req.url = '/index.html';
  }

  console.log("req.url", req.url);
  console.log("req.method", req.method);
  console.log("req.headers", req.headers);

  let reqBody = '';
  req.setEncoding('utf8');
  req.on('data', (chunk) => {
    reqBody += chunk;
  });
  req.on('end', () => {
    // reqBody is complete, handle request!
    console.log(reqBody);

    fs.readFile(resourceMapping[req.url] || '', (err, content) => {
      if(err){
        res.statusCode = 404;
        sendContent(res, 'Resource not found');
        return;
      }
      sendContent(res, content);
    });
  });

  // fs.readFile('./public/helium.html', (err, content) =>{
  //   if(err){
  //     res.statusCode = 500;
  //     res.write("Server fault occurred");
  //     res.end();
  //     return;
  //   }
  //   res.setHeader('Content-Type', 'text/plain');
  //   res.write(content);
  //   res.end();
  // });

});



server.listen(PORT, () => {
  console.log("server is listening on port", PORT);
});