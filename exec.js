/**
 * Para Uso Local
 */
var lambda = require('./index.js');
var event = require('./event.js');

var thisEvent = new event();

lambda.handler(thisEvent);