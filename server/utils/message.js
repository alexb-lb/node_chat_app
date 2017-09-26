/** Created by alex on 26.09.2017 **/
'use strict';
const generateMessage = (from, text) => {
  return {
    from, text, createdAt: new Date().getTime()
  }
};

module.exports = {generateMessage};