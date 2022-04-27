import {add} from './utils/utils.js'

const libs = require.context('./utils', true, /\.js$/)
console.log(libs.keys());
console.log(libs);
add(6,9);