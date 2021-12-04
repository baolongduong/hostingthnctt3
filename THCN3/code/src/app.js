const http = require('http');
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const app = express();
const handlebars  = require('express-handlebars');
const path = require('path');
const PORT = 5000;
const cors = require('cors')
const Mixdata = require('../backend/Server/DB/MixData');


var corsOptions = {
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200 ,
  };

app.use(morgan('combined'));
app.use(express.static( path.join(__dirname, 'public')));
app.engine('hbs', handlebars ({
    extname: '.hbs'
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

//console.log('PATH:', path.join(__dirname,'resources//views'))

app.get('/', (req, res) => {
    res.render('home');
});


app.use('/ed:dataId', (req, res) => {
    res.render('editform');
    const id = req.params._dataId;
    Mixdata.findById(id)
    .exec()
    .then(data=>{
        if(data){
            res.status(200).json(data)
        }
        else{
            res.status(404).json({message:'data not found'});
        }
        
    })
    .catch(err=>{
        res.status(500).json({ error:err });
    })
});


app.post('/:dataId',async (req,res)=>{
    try{
        const updateData = await Mixdata.updateOne(
            {_id:req.params.dataId},
            {$set:{
                username:req.body.username,
                age: req.body.age,
                heartrate:req.body.heartrate,
            }}
        );
        res.json(updateData);
        console.log("update thanh cong");
        // res.redirect('/edit');
    }catch(err){
        res.json({message:err});
    }
});


// app.get('/user', (req, res) => {
//     res.render('user');
// });

// var nim = document.getElementById('inputname');

app.use(cors(corsOptions));

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))

// http.createServer(function (req,res){
//         fs.readFile('index.html', function(err,data){
//                 res.writeHead(200,{
//                         'Content-Type':'text/html',
//                         'Content-Length':data.length,
//                 });
//                 res.write(data);
//                 res.end();
//         });
// }).listen(8080);

