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
            error is not defined
            at eval (eval at compile (C:\Users\user 1\Downloads\New folder (2)\UniResCollab-1\node_modules\ejs\lib\ejs.js:673:12), <anonymous>:13:8)
            at login (C:\Users\user 1\Downloads\New folder (2)\UniResCollab-1\node_modules\ejs\lib\ejs.js:703:17)
            at tryHandleCache (C:\Users\user 1\Downloads\New folder (2)\UniResCollab-1\node_modules\ejs\lib\ejs.js:274:36)
            at exports.renderFile [as engine] (C:\Users\user 1\Downloads\New folder (2)\UniResCollab-1\node_modules\ejs\lib\ejs.js:491:10)
            at View.render (C:\Users\user 1\Downloads\New folder (2)\UniResCollab-1\node_modules\express\lib\view.js:139:8)
            at tryRender (C:\Users\user 1\Downloads\New folder (2)\UniResCollab-1\node_modules\express\lib\application.js:627:10)
            at Function.render (C:\Users\user 1\Downloads\New folder (2)\UniResCollab-1\node_modules\express\lib\application.js:574:3)
            at ServerResponse.render (C:\Users\user 1\Downloads\New folder (2)\UniResCollab-1\node_modules\express\lib\response.js:909:7)
            at login (C:\Users\user 1\Downloads\New folder (2)\UniResCollab-1\BackEnd\Controllers\userController.js:21:13)
            at Layer.handleRequest (C:\Users\user 1\Downloads\New folder (2)\UniResCollab-1\node_modules\router\lib\layer.js:152:17)
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

  