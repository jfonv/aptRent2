/* eslint-disable no-unused-expressions, func-names,
   no-underscore-dangle, no-param-reassign */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String },
  sqft: { type: Number, min: 500, max: 2500 },
  rooms: { type: Number, min: 1, max: 4 },
  rent: { type: Number, min: 1000 },
  deposit: { type: Number, min: 50 },
  collectedRent: { type: Number, default: 0 },
  rentDue: { type: Number, min: 1, max: 31 },
  lateFee: { type: Number, min: 10 },
  renter: { type: mongoose.Schema.ObjectId, ref: 'Renter' },
  dateCreated: { type: Date, default: Date.now },
});


schema.methods.lease = function (renter, cb) {
  this.renter = renter._id;
  renter.apt = this._id;
  renter.money -= this.deposit;
  cb(null, renter);
};
module.exports = mongoose.model('Apt', schema);
