import { fooESM } from './module_one';
const { fooCJS } = require('./module_two');

fooESM();
fooCJS();
