const Mocha = require('mocha');

const _run = Mocha.prototype.run;

Mocha.prototype.run = function (...args) {

  require('reflect-metadata');

  /**
   * Provide mock browser
   */
  const { JSDOM } = require('jsdom');
  const { window } = new JSDOM();
  global.window = window;

  _run.apply(this, args);
};