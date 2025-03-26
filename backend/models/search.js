const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    recipeNum: {
      type: String,
      required: true
    },
    recipe: {
      type: String,
      required: false
    },
    cost: {
      type: Number,
      required: false
    },
    region: {
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
