const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Product = require('../modals/productModals');

dotenv.config({
  path: './config.env',
});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection successful');
  })
  .catch((err) => {
    console.log(err);
  });

//READ JSON FILE
const products = JSON.parse(fs.readFileSync(`${__dirname}/data.json`, 'utf8'));

//IMPORT DATA FROM DB

const importData = async () => {
  try {
    await Product.create(products);
    console.log('Data imported Successfully');
  } catch (err) {
    // console.log(err);
  }
  process.exit();
};

//DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Product.deleteMany();

    console.log('Data Successfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
// console.log(process.argv[2]);

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
