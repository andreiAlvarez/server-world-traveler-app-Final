const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const countrySchema = new Schema(
  {
    // unless you are defining more than the "type" property, you don't have to use {} (see below)
    // firstName: {type: String, require: true}
    name: String,
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    pictureUrl: { type: String},
   image: { type: String }
  },
 
  {
    // keeps record when is created and updated
    timestamps: true
  }
);


module.exports = model('Country', countrySchema);
