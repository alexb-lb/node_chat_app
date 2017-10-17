/** Created by alex on 16.10.2017 **/
'use strict';
const moment = require('moment');
moment.locale('ru');

let date = moment();

let now = date.format('H:mm');
console.log(now);


