module.exports.Home=function(req,res){
    // console.log(req.cookies);
    // res.cookie('sudip',10);
    return res.render('home',{
        title:'Home'
    });
}
