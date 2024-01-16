const fs = require('node:fs');
const path = require('node:path');
let file = path.join('./01-read-file/text.txt');
const rr = fs.createReadStream(file, { encoding: 'utf8' });
let data = '';
rr.on('data', function (chunk) {
  data += chunk;
});
rr.on('end', function () {
  console.log(data);
});
rr.on('error', function (err) {
  console.log(err.stack);
});
