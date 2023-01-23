const express=require('express');
const cookieParser=require('cookie-parser');
const port=3000;
const app= express();
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
app.use(expressLayouts);


app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
//static file for assests
app.use(express.static('./assests'));

app.set('view engine','ejs');
app.set('views','./views');

//now separate the file
app.use(express.urlencoded());
app.use(cookieParser());
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){console.log(`Error in running the server:${err}`);}
    console.log(`Yupp! Server running:${port}`);
});
