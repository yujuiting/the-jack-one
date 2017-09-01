const Mocha = require('mocha');

const _run = Mocha.prototype.run;

Mocha.prototype.run = function (...args) {

  require('rxjs/add/observable/merge');
  require('rxjs/add/observable/fromEvent');
  require('rxjs/add/operator/map');
  require('rxjs/add/operator/filter');
  require('reflect-metadata');

  /**
   * Provide mock browser
   */
  const { JSDOM } = require('jsdom');
  const { window } = new JSDOM();
  global.window = window;

  _run.apply(this, args);
};