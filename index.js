const express=require('express');
const cookieParser=require('cookie-parser');
const port=4000;
const app= express();
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const flash=require('connect-flash');
app.use(expressLayouts);

//use for session
const passport= require('passport');
const passportLocal= require('./config/passport-local-strategy');
const session=require('express-session');
const MongoStore=require('connect-mongo');
const customMware= require('./config/middleware');
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
//static file for assests
app.use(express.static('./assests'));

app.use('/uploads',express.static(__dirname+'/uploads'));
// app.set('view engine','ejs');
// app.set('views','./views');

//now separate the file
app.use(express.urlencoded());
app.use(cookieParser());
// app.use('/',require('./routes'));

app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'Practice',
    secret:'blahThing',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:MongoStore.create(
    {
        mongoUrl:'mongodb://127.0.0.1/practice_devolvement',
        autoRemove:'disabled'

    }

    )


}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){console.log(`Error in running the server:${err}`);}
    console.log(`Yupp! Server running:${port}`);
});
