const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1/practice_devolvement');
const db=mongoose.connection;
db.on('error',console.log.bind(console,"Error Connecting"));
db.once('open',()=>{
    console.log("Connecting to Database:MongoDB");
})