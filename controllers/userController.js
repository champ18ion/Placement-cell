const User = require('../models/user')

module.exports.signIn = function(req,res){
    res.render('log-in')
}

module.exports.signUp = function(req,res){
    res.render('sign-up')
}

// creating a new user
module.exports.create = async function(req,res){
    try {
        const{firstname,lastname,email,password,confirm_password}=req.body;
        console.log(req.body)
         // if password doesn't match
        if (password != confirm_password) {
        return res.redirect("back");
        }
  
        // check if user exist already
        User.findOne({email}, async (err,user)=>{
            if(err){
                console.log("error in signin up");
                return;
            }
            if(!user){
                await User.create({
                    firstname,
                    lastname,
                    email,
                    password
                },(err,user)=>{
                    if(err){
                        console.log('error in creating user')
                    }
                    return res.redirect('/')
                })
            }else{
                console.log("error", "Email already registed!");
                 return res.redirect("back");
            }
        })
       
    } catch (error) {
        console.log(error);
    }

}