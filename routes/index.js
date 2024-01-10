var express = require('express');
var router = express.Router();
const userModel = require("./users")
const postModel = require("./posts");
const passport = require('passport');
const localStrategy = require("passport-local")
const upload = require("./multer")

// is line sai user sign in hota hai
passport.use(new localStrategy(userModel.authenticate()))

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/login', function (req, res, next) {
  // console.log(req.flash("error"))

  res.render('login', {error: req.flash("error")});
});

router.get('/profile',isLoggedIn, async function (req, res, next) {
  // const user = await userModel.findOne({
  //   // req.session.passport.user mai login k baad hmara logged in user ajata hai
  //   username : req.session.passport.user
  // });

  const user = await userModel.findOne({
    // req.session.passport.user mai login k baad hmara logged in user ajata hai
    username : req.session.passport.user
  }).populate("posts");
  console.log(user)
  // console.log(user)
  res.render("profile", {user});
});

router.post("/register", (req,res)=>{
  const { username, email, fullname } = req.body;
  const userData = new userModel({ username, email, fullname });
  
  userModel.register(userData, req.body.password)
  .then(()=>{
    passport.authenticate("local")(req,res,()=>{
      res.redirect("/profile")
    })
  })
})

router.post("/login", passport.authenticate("local",{
  successRedirect : "/profile",
  failureRedirect: "/login",
  failureFlash:true //issai agar properly logged in ni ho payega toh flash messages dikh payenge
}), (req,res)=>{

})

router.get("/feed", (req,res,next)=>{
  res.render("feed")
})

router.post("/upload",isLoggedIn, upload.single("file") , async (req,res)=>{
  if(!req.file){
    return res.status(404).send("No files were uploaded")
  }
  // res.send("File uploaded successfully")
  
  //jo file upload hui hai oosai save karo as a post and uska postid user ko doo and post ko userid doo
  const user = await userModel.findOne({username: req.session.passport.user})
  const post = await postModel.create({
    image: req.file.filename, // ismai hota  hai jo file upload hui hai uska name
    imageText: req.body.filecaption,
    user: user._id 
  })

  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile")

})

router.post("/logout", (req,res)=>{
  req.logOut((err)=>{
    if (err) {return next(err);}
    res.redirect("/");
  });
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next();
  res.redirect("/login");
}

module.exports = router;
