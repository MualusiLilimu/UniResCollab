const  collection  = require('../Models/userModel');
const bcrypt=require('bcrypt');

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
      loginFill: async (req, res) => {
        let { username, password ,role} = req.body;
       
        if (username === "" || password === "" || role==="") {
            return res.json({
                status: "Error",
                message: "Empty fields"
            });
        }
    
        try {
            const data = await collection.find({ username });
    
            if (data.length === 0) {
                return res.json({
                    status: "Failed",
                    message: "User not found"
                });
            }
    
            const hashedPassword = data[0].password;
            const userRole = data[0].role; 
    
            const result = await bcrypt.compare(password, hashedPassword);
    
            if (result) {
                if(Userrole==="Researcher"){return res.render('ResearcherHome');}
                else if(role==="Admin"){return res.render('AdminHome');}
                else if(role==="Reviewer"){return res.render('ReviewerHome');}
                
            } else {
                return res.json({
                    status: "Failed",
                    message: "Incorrect password"
                });
            }
        } catch (err) {
            console.error(err);
            return res.json({
                status: "Failed",
                message: "An error occurred"
            });
        }
    }
    ,
    registerFill: async (req, res) => {
        try {
          let { username, email, password, role } = req.body;
          username = username.trim();
          email = email.trim();
          password = password.trim();
          role = role.trim();
      
          const saltRounds = 15;
          const hashedPassword = await bcrypt.hash(password, saltRounds);
      
          const newUser = new collection({
            username,
            email,
            password: hashedPassword,
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

  