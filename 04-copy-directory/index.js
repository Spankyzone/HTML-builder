const path = require('path');
const fs = require('fs/promises');
const src = path.join(__dirname, 'files');
const dir = path.join(__dirname, 'files-copy');

async function copyFiles() {
  try {
    await fs.access(src);
    await fs.mkdir(dir, { recursive: true });
    const files = await fs.readdir(src);
    for (const file of files) {
      const sourceFile = path.join(src, file);
      const destinationFile = path.join(dir, file);
      await fs.copyFile(sourceFile, destinationFile);
    }
    console.log('All files successfully copied');

    const copiedFiles = await fs.readdir(dir);
    for (const copiedFile of copiedFiles) {
      if (!files.includes(copiedFile)) {
        const fileToDelete = path.join(dir, copiedFile);
        await fs.unlink(fileToDelete);
      }
    }
  } catch (err) {
    console.error('Error file copied:', err);
  }
}
copyFiles();
