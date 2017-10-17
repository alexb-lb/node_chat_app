/** Created by alex on 18.10.2017 **/
'use strict';
let isRealString = (str) => {
  return typeof str === 'string' && str.trim().length > 0;
};

module.exports = {isRealString};