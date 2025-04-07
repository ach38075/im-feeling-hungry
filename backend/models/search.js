const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    recipeNum: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: false
    },
    image: {
      type: String,
      required: true
    },
    sourceUrl: {
      type: String,
      required: false
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Search', recipeSchema);
