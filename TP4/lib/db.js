"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const db = mongoose.connection;

const Order = new Schema({
  id: { type: Number, unique: true },
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  products: Array
}, { versionKey: false });


const Product = new Schema({
  id: { type: Number, unique: true },
  name: String,
  price: Number,
  image: String,
  category: String,
  description: String,
  features: Array
}, { versionKey: false });

mongoose.model("Order", Order);
mongoose.model("Product", Product);

mongoose.Promise = global.Promise;

// TODO: Initialiser la connexion avec le "connect string" de votre base de données.
//mongoose.connect("mongodb://...", { useMongoClient: true });
mongoose.connect("mongodb+srv://admin:3WKhLrP6GuRvglOM@online-shop.4va55.mongodb.net/onlineshop?retryWrites=true&w=majority", 
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  });

db.once('open', () => console.log('connected to database'))