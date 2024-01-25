const path = require('path');
const fs = require('fs/promises');
const src = path.join(__dirname, 'styles');
const dist = path.join(__dirname, 'project-dist');
const componentsFilesPath = path.join(__dirname, 'components');
const assets = path.join(__dirname, 'assets');

async function createDistFolder(targetPath) {
  await fs.mkdir(targetPath, { recursive: true });
  let template = '';
  await fs.readFile(path.join(__dirname, 'template.html')).then((chunk) => {
    template += chunk;
  });
  await fs.readdir(componentsFilesPath).then(async (files) => {
    for (let file of files) {
      const filePath = componentsFilesPath + `/${file}`;
      const parsed = path.parse(filePath);
      const data = await fs.readFile(filePath, { encoding: 'utf-8' });
      template = template.replace(`{{${parsed.name}}}`, data);
    }
  });
  fs.writeFile(targetPath + '/index.html', template);
}
createDistFolder(dist);

// merge styles in style.css
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
          path.join(__dirname, 'project-dist', 'style.css'),
          bundleCss,
        );
      });
    }
    console.log('style.css successfully created');
  });
} catch (err) {
  console.log(err);
}

// // Copy assets to project dir
async function copyFilesRecursive(sourceDir, targetDir) {
  await fs.mkdir(targetDir, { recursive: true });
  const sourceFiles = await fs.readdir(sourceDir);
  const targetFiles = await fs.readdir(targetDir);

  for (const file of sourceFiles) {
    const sourcePath = `${sourceDir}/${file}`;
    const targetPath = `${targetDir}/${file}`;
    const stats = await fs.stat(sourcePath);

    if (stats.isDirectory()) {
      await copyFilesRecursive(sourcePath, targetPath);
    } else {
      await fs.copyFile(sourcePath, targetPath);
    }
  }

  for (const file of targetFiles) {
    if (!sourceFiles.includes(file)) {
      const filePath = `${targetDir}/${file}`;
      await fs.unlink(filePath);
    }
  }
}

copyFilesRecursive(assets, path.join(dist, 'assets'))
  .then(() => console.log('Files successfully copied'))
  .catch((err) => console.error('Error copying files:', err));
