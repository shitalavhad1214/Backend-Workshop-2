const express = require('express');
const app = express();

const db = require('./config/db');

const userRoutes = require('./route/user');
const roleRoutes = require('./route/role');



app.use(express.json());

app.use('/user', userRoutes);
app.use('/role', roleRoutes);

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});