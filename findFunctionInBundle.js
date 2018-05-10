const fs = require('fs');
const chalk = require('chalk');

const regExs = [
  {
    fn: 'fooCJS',
    module: 'module_two',
    reg: /FOO_CJS/
  },
  {
    fn: 'barCJS',
    module: 'module_two',
    reg: /BAR_CJS/
  },
  {
    fn: 'fooESM',
    module: 'module_one',
    reg: /FOO_ESM/
  },
  {
    fn: 'barESM',
    module: 'module_one',
    reg: /BAR_ESM/
  }
];

const buffer = fs.readFileSync(__dirname + '/dist/main-bundle.js');
const fileAsString = buffer.toString();

console.log('============WAS INCLUDED IN BUNDLE?================');
for ({ reg, module, fn } of regExs) {
  if (fileAsString.match(reg)) {
    console.log(chalk.cyan(`${module}.${fn}`), chalk.green('included'));
  } else {
    console.log(chalk.cyan(`${module}.${fn}`), chalk.red('not included'));
  }
}
