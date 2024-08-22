const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://nehakumari2221:NehaSingh451311@cluster0.8nwy6.mongodb.net/FreshDashmern?retryWrites=true&w=majority&appName=Cluster0'

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected ");

    // If you want to fetch data after successful connection:
    const fetched_data = mongoose.connection.db.collection("food_items");
    const data = await fetched_data.find({}).toArray();
    console.log();
const foodCategory

  } catch (err) {
    global.food_items = data;
    console.log(global.food_items)
  }
};

module.exports = mongoDB;
