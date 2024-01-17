const path = require('path');
const fs = require('fs');
const direct = path.join('./03-files-in-folder/secret-folder');
fs.readdir(direct, (err, files) => {
  if (err) {
    throw new Error(err);
  }
  files.forEach((el) => {
    console.log(path.parse(direct + `/${el}`));
  });
});
