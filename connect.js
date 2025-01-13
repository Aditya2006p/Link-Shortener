const mongoose = require("mongoose");

async function connectMongoDb(url) {
    console.log(`Connecting to MongoDB at ${url}`);
    return mongoose.connect(url)
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.log("Failed to connect to MongoDB", err));
}

module.exports = {
    connectMongoDb,
};