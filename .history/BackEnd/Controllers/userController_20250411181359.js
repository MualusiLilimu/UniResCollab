const  collection  = require('../Models/userModel');

module.exports = {
    welcome:(req,res)=>{
        res.render('index.ejs');
    },
    register:(req,res)=>{
        res.render('Register.ejs');
    },
    AdminHome:(req,res)=>{
        res.render('AdminHome.ejs');
    },
    ResearcherHome:(req,res)=>{
        res.render('ResearcherHome.ejs');
    },
    ReviewerHome:(req,res)=>{
        res.render('ReviewerHome.ejs');
    },
    login: (req, res) => {
        res.render('login');
      },
    loginFill:(req,res)=>{
        
       const {username,password}=req.body;

       console.log(username);
       res.send(`Welcome ${username}`);
    },
    registerFill: async (req, res) => {
        const { username, email, password, role } = req.body;
        username=username.trim();
        email=email.trim();
        password=password.trim();
        role=role.trim();
        if(username=="" || email=="" || password=="" || role==""){
            res.json({
                status:"Error",
                message:"Enter all the input"

            });
        }else{}
      
        try {
          const newUser = new collection({
            username,
           
            email,
            password,
            role
          });
      
          await newUser.save();
          res.send("Added");
        } catch (err) {
          console.error(err);
          res.send("Failed");
        }
      }
      
      


   
  }

  