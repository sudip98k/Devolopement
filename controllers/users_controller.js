const User=require('../models/user');
const fs=require('fs');
const path=require('path');
module.exports.profile = function(req,res){
    let id=req.params.id;
        User.findById(id,function(err,user){
           
            return res.render('profile',{
                title:"UserProfile",
                profile_user:user
            })
        })
}
module.exports.update=async function(req, res){
    // if(req.user.id == req.params.id){
    //     let id=req.params.id;
    //     console.log("Login User id:",id);
    //     User.findByIdAndUpdate(id,req.body,function(err,user){
    //         return res.redirect('back');
    //     });
    // }else{
    //     return res.status(401).send('Unauthorized');
    // }

    if(req.user.id ==req.params.id){
        try {
            let user=await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('*****Multer Error',err)
                }
                console.log("req.file",req.file);
                user.name=req.body.name;
                user.email=req.body.email;

                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }

                    //this is the saving the path of the uploaded file into the field in user
                    user.avatar=User.avatarPath +'/'+req.file.filename;
                }
                user.save();
                return res.redirect('back');
            })
        } catch (error) {
            req.flash('error', error);
            return res.redirect('back');
        }

    }else{
        req.flash('error',"Unauthorized");
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
    req.flash('success','Logged in successfully');
    return res.redirect('/');
}

module.exports.destroySession=function(req,res){
    req.logout(function(err){
        if(err){return err;}
    })
    req.flash('success','Logged out successfully');
    return res.redirect('/');
}