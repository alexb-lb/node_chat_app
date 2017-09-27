/** Created by alex on 26.09.2017 **/
'use strict';
var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Alex';
    var text = 'Some message';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
  })
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Alex';
    var lat  = '123';
    var long = '456';

    var message = generateLocationMessage(from, lat, long);

    expect(message.createdAt).toBeA('number');
    expect(message.url).toBe(`https://www.google.com/maps?q=${lat},${long}`);
  })
});