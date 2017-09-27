/** Created by alex on 26.09.2017 **/
'use strict';
const generateMessage = (from, text) => {
  return {
    from, text, createdAt: new Date().getTime()
  }
};

const generateLocationMessage = (from, lat, long) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${lat},${long}`,
    createdAt: new Date().getTime()
  }
};

module.exports = {generateMessage, generateLocationMessage};