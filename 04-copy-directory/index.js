const path = require('path');
const fs = require('fs/promises');
const src = path.join(__dirname, 'files');
const dir = path.join(__dirname, 'files-copy');

function copyDir() {
  fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
    console.log(err);
  });
  fs.readdir(src).then((files) => {
    files.forEach((el) => {
      fs.copyFile(src + `/${el}`, dir + `/${el}`)
        .then(() => {
          console.log('copy done');
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
}
copyDir();
