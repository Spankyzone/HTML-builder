const fs = require('fs/promises');
const path = require('path');
const src = path.join(__dirname, 'styles');

try {
  fs.readdir(src, { encoding: 'utf-8' }).then((files) => {
    const cssFiles = files.filter((el) => {
      const parsedPath = path.parse(src + `/${el}`);
      if (parsedPath.ext === '.css') {
        return el;
      }
    });
    let bundleCss = [];
    for (let i = 0; i < cssFiles.length; i += 1) {
      const read = fs.readFile(path.join(__dirname, 'styles', cssFiles[i]));
      read.then((data) => {
        bundleCss.push(data);
        fs.writeFile(
          path.join(__dirname, 'project-dist', 'bundle.css'),
          bundleCss,
        );
      });
    }
    console.log('Bundle.css successfully created');
  });
} catch (err) {
  console.log(err);
}
