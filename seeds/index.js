const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 30) + 10;
    const camp = new Campground({
      author: "6646cff1c86bf29201654453",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: 'https://res.cloudinary.com/dtc2ofid2/image/upload/v1716184210/YelpCamp/t9h1glryr2ilk4w937s1.jpg',
          filename: 'YelpCamp/t9h1glryr2ilk4w937s1'
        },
        {
          url: 'https://res.cloudinary.com/dtc2ofid2/image/upload/v1716184210/YelpCamp/ybyi8pigbmszhvlaudjw.jpg',
          filename: 'YelpCamp/ybyi8pigbmszhvlaudjw'
        }
      ],
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce libero arcu, gravida sit amet diam id, venenatis commodo est. Duis ac consequat risus.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude
        ]
      }
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});