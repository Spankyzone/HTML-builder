const readline = require('readline');
const path = require('path');
const ws = require('fs');
const write = ws.createWriteStream(path.join('./02-write-file/text.txt'));
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.setPrompt('Hello. What do you want to write to the file?\n');
rl.prompt();
try {
  rl.on('line', (str) => {
    if (str === 'exit') {
      rl.close();
      return;
    }
    write.write(str + '\n');
  });
  rl.on('close', () => {
    console.log('Goodbye');
  });
} catch (error) {
  throw new Error(error);
}
