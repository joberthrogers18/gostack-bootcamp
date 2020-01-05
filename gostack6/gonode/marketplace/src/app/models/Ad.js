const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const { Schema, model } = mongoose;

const AdSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// paginar os vários anuncios
AdSchema.plugin(mongoosePaginate);

module.exports = model('Ad', AdSchema);
