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
        res.render('login',{error:null});
      },
      loginFill: async (req, res) => {
        let { username, password } = req.body;
    
        if (username === "" || password === "" ) {
            res.render('login',{error:"Username or Password is Empty"});
        }
    
        try {
            
            const data = await collection.find({ username });
    
            if (data.length === 0) {
                res.render('login',{error:"Username not found"});
            }
    
           
            const hashedPassword = data[0].password;
            const userRole = data[0].role; 
          
        
            
            const result = await bcrypt.compare(password, hashedPassword);
    
            if (result) {
               
                if (userRole==="") {
                    return res.render('login',{error:"The role id empty"});
                }
    
                
                if (userRole === "Researcher") {
                    return res.render('ResearcherHome');
                } else if (userRole === "Admin") {
                    return res.render('AdminHome');
                } else if (userRole === "Reviewer") {
                    return res.render('ReviewerHome');
                } else {
                    return res.render('login',{error:"The role you entered is incorrect"});
                }
            } else {
                return res.render('login',{error:"Incorrect password"});
            }
        } catch (err) {
            console.error(err);
            return res.render('login',{error:"An error occured"});
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
          const UserRole = role;
      
          const saltRounds = 15;
          const hashedPassword = await bcrypt.hash(password, saltRounds);
      
          const newUser = new collection({
            username,
            email,
            password: hashedPassword,
            role:UserRole
          });
      
          await newUser.save();
          res.send("Added");
        } catch (err) {
          console.error(err);
          res.send("Failed");
        }
      }
      
      
      


   
  }

  