/* eslint-disable no-unused-expressions, func-names */

const expect = require('chai').expect;
// const sinon = require('sinon');
const Renter = require('../../dst/models/renter');

describe('Renter', () => {
  describe('constructor', () => {
    it('should create a renter object', (done) => {
      const r = new Renter({ name: 'Joe',
                        money: 2000,
                        complaints: 0 });
      r.validate(err => {
        // console.log('d: ', d);
        expect(err).to.be.undefined;
        expect(r.name).to.equal('Joe');
        expect(r.money).to.equal(2000);
        expect(r.complaints).to.equal(0);
        done();
      });
    });
    it('should not create a renter object - not enough money', (done) => {
      const r = new Renter({ name: 'Joe',
                        money: 100,
                        complaints: 0 });
      r.validate(err => {
        // console.log('d: ', d);
        expect(err).to.be.ok;
        done();
      });
    });
    it('should not create a renter object - name too short', (done) => {
      const r = new Renter({ name: 'J',
                        money: 1000,
                        complaints: 0 });
      r.validate(err => {
        // console.log('d: ', d);
        expect(err).to.be.ok;
        done();
      });
    });
  });
});
