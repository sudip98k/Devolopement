module.exports.Home=function(req,res){
    // console.log(req.cookies);
    
    //  res.cookie('user_id','63ce47babd6fbedf179e2564');
     //res.cookie('user_id',25);

    return res.render('home',{
        title:'Home'
    });
}
