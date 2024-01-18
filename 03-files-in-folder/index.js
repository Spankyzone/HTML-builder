const path = require('path');
const fs = require('fs');
const direct = path.join('./03-files-in-folder/secret-folder');
fs.readdir(direct, { withFileTypes: true }, (err, files) => {
  if (err) {
    throw new Error(err);
  }
  files.forEach((el) => {
    if (el.isFile()) {
      const parsedPath = path.parse(direct + `/${el.name}`);
      fs.stat(direct + `/${el.name}`, (err, data) => {
        if (err) {
          console.log(err);
        }
        console.log(
          `${parsedPath.name} - ${parsedPath.ext.slice(
            1,
            parsedPath.ext.length,
          )} - ${data.size}b`,
        );
      });
    }
  });
});
