const express = require('express');
const cors = require('cors');
const connectDB = require('./DB/Connection');
var corsOptions = {
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200
};
const app = express();

connectDB();

app.use(express.json({ extended: false }));


app.use('/mixdata', require('./Api/MixData'));
app.get('/', function(req, res) {
    res.send('Welcome to HeartBeat Server')
})

//for not found
app.use((req, res, next) => {
        const error = new Error("not found");
        error.status = 404;
        next(error);
    })
    //for any other type error
app.use((req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    })
})

app.use(cors(corsOptions));
app.listen(4200, () => {
    console.log('Server started!');
});