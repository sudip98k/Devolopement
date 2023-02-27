const  Post=require('../models/post');
const User=require('../models/user');
module.exports.Home=function(req,res){
    // console.log(req.cookies);
    
    //  res.cookie('user_id','63ce47babd6fbedf179e2564');
     //res.cookie('user_id',25);
    //populate the user of each post with
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',    
        populate:{
            path:'user'
        }
    })
    .exec(function(err,posts){

        User.find({},function(err,users){
            return res.render('home',{
                title:'Home',
                posts:posts,
                all_users:users
            });

        });
    });
    
}
