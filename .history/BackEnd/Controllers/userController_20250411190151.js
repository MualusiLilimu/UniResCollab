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
    loginFill:(req,res)=>{
        
       const {username,password}=req.body;
       username = username.trim();
        
          password = password.trim();
         if(username=="" || password==""){
            res.json({
                status:"Error",
                message:"Empty fields"

            })
         }else{
            collection.find({username})
            .then(data=>{
                if(data){
                    const hashpassword=data[0].password;
                    bcrypt.compare(password,hashpassword).then(result=>{
                        if(result){
                            res.json({
                                status:"Sucessful",
                                message:"Sucessful login",
                                data:data
                            })

                        }
                        else{
                            res.json({
                                status:"Failed",
                                message:"Incorrect password",
                                
                            })
                        }
                    })
                    .catch(err=>{
                        res.json({
                            status:"Failed",
                            message:"Invalid Password",
                            

                    })
                }

            })
            .catch(err=>{

            })
         }
      

      
    },
    
      
      


   
  }

  