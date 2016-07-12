/* eslint-disable no-unused-expressions, func-names,
   no-underscore-dangle */

const expect = require('chai').expect;
// const sinon = require('sinon');
const Apt = require('../../dst/models/apt');
const Renter = require('../../dst/models/renter');

describe('Apt', () => {
  describe('constructor', () => {
    it('should create a renter object', (done) => {
      const a = new Apt({ name: 'A1',
                          sqft: 2000,
                          rooms: 2,
                          rent: 2000,
                          deposit: 100,
                          collectedRent: 0,
                          rentDue: 5,
                          lateFee: 10 });
      a.validate(err => {
        // console.log('d: ', d);
        expect(err).to.be.undefined;
        expect(a.name).to.equal('A1');
        expect(a.sqft).to.equal(2000);
        expect(a.collectedRent).to.equal(0);
        done();
      });
    });
    it('should not create a renter object - too low sqft ', (done) => {
      const a = new Apt({ name: 'A1',
                          sqft: 450,
                          rooms: 2,
                          rent: 2000,
                          deposit: 100,
                          collectedRent: 0,
                          rentDue: 5,
                          lateFee: 10 });
      a.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });
    it('should not create a renter object - too high sqft', (done) => {
      const a = new Apt({ name: 'A1',
                          sqft: 500000,
                          rooms: 2,
                          rent: 2000,
                          deposit: 100,
                          collectedRent: 0,
                          rentDue: 5,
                          lateFee: 10 });
      a.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });
    it('should not create a renter object - too few rooms', (done) => {
      const a = new Apt({ name: 'A1',
                          sqft: 2000,
                          rooms: 0,
                          rent: 2000,
                          deposit: 100,
                          collectedRent: 0,
                          rentDue: 5,
                          lateFee: 10 });
      a.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });
    it('should not create a renter object - too many rooms', (done) => {
      const a = new Apt({ name: 'A1',
                          sqft: 2000,
                          rooms: 6,
                          rent: 2000,
                          deposit: 100,
                          collectedRent: 0,
                          rentDue: 5,
                          lateFee: 10 });
      a.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });
    it('should not create a renter object - too low rent', (done) => {
      const a = new Apt({ name: 'A1',
                          sqft: 2000,
                          rooms: 1,
                          rent: 950,
                          deposit: 100,
                          collectedRent: 0,
                          rentDue: 5,
                          lateFee: 10 });
      a.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });
    it('should not create a renter object - too low deposit', (done) => {
      const a = new Apt({ name: 'A1',
                          sqft: 2000,
                          rooms: 1,
                          rent: 2000,
                          deposit: 45,
                          collectedRent: 0,
                          rentDue: 5,
                          lateFee: 10 });
      a.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });
    it('should not create a renter object - rent due 1-31', (done) => {
      const a = new Apt({ name: 'A1',
                          sqft: 2000,
                          rooms: 1,
                          rent: 2000,
                          deposit: 100,
                          collectedRent: 0,
                          rentDue: 40,
                          lateFee: 10 });
      a.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });
    it('should not create a renter object - late fee too low', (done) => {
      const a = new Apt({ name: 'A1',
                          sqft: 2000,
                          rooms: 1,
                          rent: 2000,
                          deposit: 100,
                          collectedRent: 0,
                          rentDue: 40,
                          lateFee: 5 });
      a.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });
  });

  describe('#lease', () => {
    it('should lease an apartment', (done) => {
      const a = new Apt({ name: 'A1',
                          sqft: 2000,
                          rooms: 2,
                          rent: 2000,
                          deposit: 100,
                          collectedRent: 0,
                          rentDue: 5,
                          lateFee: 10 });
      const r = new Renter({ name: 'Joe',
                        money: 2000,
                        complaints: 0 });
      a.validate(err => {
        r.validate(() => {
          a.lease(r, (err3, rNew) => {
            console.log('rNew: ', rNew);
            expect(err).to.be.undefined;
            // expect(err2).to.be.undefined;
            expect(err3).to.be.null;
            expect(a._id).to.equal(rNew.apt);
            expect(rNew.name).to.equal('Joe');
            expect(rNew.money).to.equal(1900);
            done();
          });
          // console.log('d: ', d);
        });
      });
    });
  });
    // it('should not lease an apartment: no renter id', (done) => {
    //   request(app)
    //   .put('/apartments/012345678901234567890012/lease')
    //   .send({ renter: 'a123456789012345678900aa' })
    //   .end((err, rsp) => {
    //     expect(err).to.be.null;
    //     expect(rsp.status).to.equal(400);
    //     expect(rsp.body.messages).to.deep.equal(['renter is not found']);
    //     done();
    //   });
    // });
});
