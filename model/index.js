const mongoose = require('mongoose'); // Adapter to connect the nodejs and mongodb.

mongoose.connect('mongodb://localhost:27017/Edureka', (err)=>{
    if(!err)
    {
        console.log('Succes to connect to mongod')
    }
    else{
        console.log("Err to connect mongodb");
    }
})

const course = require('./course.model')