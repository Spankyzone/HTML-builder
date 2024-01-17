const fs = require('node:fs');
const path = require('node:path');
const rr = fs.createReadStream(path.join('./01-read-file/text.txt'), {
  encoding: 'utf8',
});
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
// async function logChunks(readable) {
//   for await (const chunk of readable) {
//     console.log(chunk);
//   }
// }
// logChunks(rr);
