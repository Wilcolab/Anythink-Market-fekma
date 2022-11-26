const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Comment = require('../models/Comment');
const User = require('../models/User');


mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, useUnifiedTopology: true
  })
  .then(() => {
    console.log('MONGO CONNECTION OPEN');
  })
  .catch((err) => {
    console.log(err);
  });

let seedProducts = [];
let seedComments = [];
let seedUsers = [];


seedProducts = createProductSeed(100);
seedComments = createCommentSeed(100);
seedUsers = createUsertSeed(100);


const seedDB = async () => {

  await Product.insertMany(seedProducts);
  await Comment.insertMany(seedComments);
  await User.insertMany(seedUsers);
};
seedDB().then(() => {
  mongoose.connection.close();
});

function createProductSeed(size) {
  const productSeed = [];
  for (let i = 0; i < size; i++) {
    const name = faker.name.fullName();
    const price = faker.commerce.price();
    productSeed.push({ name, price })
  }
  return productSeed;
}

function createCommentSeed(size) {
  const commentSeed = [];
  for (let i = 0; i < size; i++) {
    commentSeed.push({ body: faker.lorem.text() });
  }
  return commentSeed;
}


function createUsertSeed(size) {
  const userSeed = [];
  const roleEnum = ["user", "admin"];
  for (let i = 0; i < size; i++) {
    const username = faker.name.firstName().toLowerCase() + `${Math.floor(Math.random() * 10000)}`
    userSeed.push({
      username,
      email: faker.internet.email(),
      bio: faker.lorem.text(),
      image: faker.image.imageUrl(),
      role: roleEnum[Math.floor(Math.random() * roleEnum.length)],
      hash: faker.lorem.text(),
      salt: faker.lorem.text()
    });
  }
  return userSeed;
}
