const User = require('../models/user')

// render the Login page
module.exports.signIn = function(req,res){
    if (req.isAuthenticated()) {
        return res.redirect("/profile");
      }
    return res.render('log-in',{title:'Log-IN | Placement Cell'})
}

// render the profile page
module.exports.profile = function (req, res) {
    return res.render("profile", {
      title: "User Profile",
      profile_user: req.user,
    });
  };

// render the Sign-up page
module.exports.signUp = function(req,res){
  if (req.isAuthenticated()) {
    return res.redirect("/dashboard");
  }
   return res.render('sign-up',{title:'Sign-UP | Placement Cell'})
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

};

// update user Details
module.exports.updateUser = async function (req, res) {
    try {
      const user = await User.findById(req.user.id);
      const { firstname,lastname, password, confirm_password } = req.body;
  
      if (password != confirm_password) {
        return res.redirect("back");
      }
  
      if (!user) {
        return res.redirect("back");
      }
      user.firstname = firstname;
      user.lastname = lastname;
      user.password = password;
  
      user.save();
      return res.redirect("back");
    } catch (err) {
      console.log(err);
      return res.redirect("back");
    }
  };

// sign in and create a session for the user
module.exports.createSession = (req, res) => {
    return res.redirect("/dashboard");
  };

// clears the cookie
module.exports.destroySession = (req, res) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/");
    });
  };