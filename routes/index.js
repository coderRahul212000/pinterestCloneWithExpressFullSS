var express = require('express');
var router = express.Router();
const userModel = require("./users")
const postModel = require("./posts")

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/alluserposts",async (req,res,next)=>{
  /* //ab in lines sai mujhe jo user milega oosmai posts array mai id's hongi
     // isliye posts dekhne k liye mujhe krna hoga .populate()
  let user = await userModel.findOne({_id:"659dc0a9ffba30932160a369"});
  res.send(user);
  */

  let user = await userModel
  .findOne({_id:"659dc0a9ffba30932160a369"})
  .populate("posts") //populate k andr btao kis feild ko populate krna hai fir woh id's sai data mai convert hojayega
  res.send(user);
})

router.get('/createuser', async function (req, res, next) {
  let createduser = await userModel.create({
    username: "harsh",
    password: "harsh",
    posts: [],
    email: "harsh@male.com",
    fullName: "Harsh Vandana Sharma",
  });
  
  res.send(createduser);
});

router.get('/createpost', async function (req, res, next) {
  let createdpost = await postModel.create({
    postText: "Hello kaise ho saare",
    user: "659dc0a9ffba30932160a369"

  });

  let user = await userModel.findOne({_id:"659dc0a9ffba30932160a369"});
  user.posts.push(createdpost._id);
  await user.save();
  res.send("done")

});

module.exports = router;
