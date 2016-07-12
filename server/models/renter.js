import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true, minlength: 2 },
  money: { type: Number, required: true, min: 1000 },
  apt: { type: mongoose.Schema.ObjectId, ref: 'Apt' },
  complaints: { type: Number, default: 0 },
  dateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Renter', schema);
