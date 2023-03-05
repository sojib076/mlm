const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const port = 3000;
mongoose.connect('mongodb+srv://sojibgo:sojibgo@cluster0.eybr6od.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to database');
}).catch((err) => {});
app.use(express.json());

const userRoute = require('./route/userRoute');
app.use('/user', userRoute);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});