var http = require("http");
var fs = require("fs");
var path = require("path");

var PORT = 3000;
var ROOT = __dirname;

var MIME = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".mp3": "audio/mpeg",
  ".svg": "image/svg+xml",
};

var server = http.createServer(function (req, res) {
  var urlPath = decodeURIComponent(req.url.split("?")[0]);
  if (urlPath === "/") urlPath = "/index.html";

  var filePath = path.join(ROOT, urlPath);

  fs.readFile(filePath, function (err, data) {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 - No encontrado: " + urlPath);
      return;
    }
    var ext = path.extname(filePath).toLowerCase();
    var type = MIME[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": type });
    res.end(data);
  });
});

server.listen(PORT, function () {
  console.log("Servidor activo en http://localhost:" + PORT);
});
