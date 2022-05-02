const mongoose = require("mongoose");
const dotenv = require("dotenv");
const products = require("./data/products");
const users = require("./data/users");
const Product = require("./models/product");
const User = require("./models/User");
const Order = require("./models/Order");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();

    const createUsers = await User.insertMany(users);

    const adminUser = createUsers[0]._id;
    console.log(adminUser);
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log("data Imported!!!");
    process.exit();
  } catch (error) {
    console.log(`${error.message}`);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();

    console.log("data destroy!!!");
    process.exit();
  } catch (error) {
    console.log(`${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  deleteData();
} else {
  importData();
}
