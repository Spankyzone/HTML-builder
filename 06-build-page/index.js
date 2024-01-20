const path = require('path');
const fs = require('fs/promises');
const { match } = require('assert');
const src = path.join(__dirname, 'styles');
const dist = path.join(__dirname, 'project-dist');
const componentsFilesPath = path.join(__dirname, 'components');
const assets = path.join(__dirname, 'assets');

async function createDistFolder(targetPath) {
  let componentInDir = [];
  await fs.mkdir(targetPath, { recursive: true });
  let template = '';
  await fs.readFile(path.join(__dirname, 'template.html')).then((chunk) => {
    template += chunk;
  });
  await fs.readdir(componentsFilesPath).then((files) => {
    files.forEach((el) => {
      componentInDir.push(path.parse(componentsFilesPath + `/${el}`).name);
    });
  });
  for (let i = 0; i < componentInDir.length; i += 1) {
    fs.readFile(componentsFilesPath + `/${componentInDir[i]}.html`, {
      encoding: 'utf8',
    }).then((data) => {
      let replased = template.replace(/{{(.*?)}}/g, data);
      console.log(replased);
    });
  }
  fs.writeFile(targetPath + '/index.html', template);
}
createDistFolder(dist);
// merge styles in style.css
// try {
//   fs.readdir(src, { encoding: 'utf-8' }).then((files) => {
//     const cssFiles = files.filter((el) => {
//       const parsedPath = path.parse(src + `/${el}`);
//       if (parsedPath.ext === '.css') {
//         return el;
//       }
//     });
//     let bundleCss = [];
//     for (let i = 0; i < cssFiles.length; i += 1) {
//       const read = fs.readFile(path.join(__dirname, 'styles', cssFiles[i]));
//       read.then((data) => {
//         bundleCss.push(data);
//         fs.writeFile(
//           path.join(__dirname, 'project-dist', 'style.css'),
//           bundleCss,
//         );
//       });
//     }
//     console.log('style.css successfully created');
//   });
// } catch (err) {
//   console.log(err);
// }

// // Copy assets to project dir
// async function copyFilesRecursive(sourceDir, targetDir) {
//   const files = await fs.readdir(sourceDir);

//   for (const file of files) {
//     const sourcePath = `${sourceDir}/${file}`;
//     const targetPath = `${targetDir}/${file}`;
//     const stats = await fs.stat(sourcePath);

//     if (stats.isDirectory()) {
//       await fs.mkdir(targetPath, { recursive: true });
//       await copyFilesRecursive(sourcePath, targetPath);
//     } else {
//       await fs.copyFile(sourcePath, targetPath);
//     }
//   }
// }

// copyFilesRecursive(assets, dist)
//   .then(() => console.log('Files successfully copied'))
//   .catch((err) => console.error('Error copying files:', err))
