
const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/edutracUser")
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log("NOT CONNECTED TO NETWORK", err))