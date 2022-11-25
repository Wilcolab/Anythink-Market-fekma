var mongoose = require("mongoose");

var ProductSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
  },
  { timestamps: true }
);

ProductSchema.methods.toJSONFor = function (user) {
  return {
    id: this._id,
    name: this.name,
    price: this.price,
  };
};

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
