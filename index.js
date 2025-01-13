const express = require('express');
const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter.js');
const path = require('path');
const app = express();
const PORT = 8000;
const { connectMongoDb } = require('./connect');
const URL = require('./models/url'); // Ensure URL model is imported

connectMongoDb("mongodb://localhost:27017/LinkShortner");

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

// Ensure express can parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRoute);
app.use("/", staticRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});