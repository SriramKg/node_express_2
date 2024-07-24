const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const PORT = 8080;


// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());
dotenv.config();

const userRoutes = require('./routes/user.routes');
const newsRoutes = require('./routes/news.routes');

app.use("/users", userRoutes);
app.use("/news", newsRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})

app.get('/', (req, res) => {
    res.send('Hello World');
})


module.exports = app;