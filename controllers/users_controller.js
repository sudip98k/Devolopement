const User=require('../models/user');
module.exports.profile = function(req,res){
    let id=req.params.id;
        User.findById(id,function(err,user){
           
            return res.render('profile',{
                title:"UserProfile",
                profile_user:user
            })
        })
}
module.exports.update=function(req, res){
    if(req.user.id == req.params.id){
        let id=req.params.id;
        console.log("Login User id:",id);
        User.findByIdAndUpdate(id,req.body,function(err,user){
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
}


module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:"SignIn"
    });
}

module.exports.signUp=function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title:"SignUp"
    });
}

module.exports.create=function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('error in finding user inn signing up');return}
        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log('error in creating user signing up');return}
                res.redirect('/users/sign-in');
            });
        }
        else{
            res.redirect('back');
        }
    })
}

// module.exports.createSession=function(req,res){
//     //find the user
//     User.findOne({email:req.body.email},function(err,user){
//         if(err){console.log("User not found");return;}
//         if(user){
//             if(user.password!=req.body.password){
//                 return res.redirect('back');
//             }
//             //Handle session
//             res.cookie('user_id',user.id);
//             return res.redirect('/users/profile');
//         }
//         else{
//             return res.redirect('back')
//         }
//     });
// }

module.exports.createSession=function(req, res){
    return res.redirect('/');
}

module.exports.destroySession=function(req,res){
    req.logout(function(err){
        if(err){return err;}
    })
    return res.redirect('/');
}