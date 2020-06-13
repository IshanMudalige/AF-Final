const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const port = 5000;//port
const db_url = 'mongodb://localhost:27017/onlineEducation';//mongodb url

const app = express()

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(db_url,{ useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.log(err));

const UserRoute = require('./routes/UserRoutes');
const LectureRoute = require('./routes/LectureRoute');
const CategoryRoute = require('./routes/CategoryRoute');

app.use('/user',UserRoute);
app.use('/lecture',LectureRoute);
app.use('/category',CategoryRoute);

app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})