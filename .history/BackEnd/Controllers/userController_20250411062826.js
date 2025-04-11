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
    ReviwerHome:(req,res)=>{
        res.render('ReviewerHome.ejs');
    },
    login:(req,res)=>{
       const {username,password}=req.body;

       console.log(username);
       res.send(`Welcome ${Username}`);
    }


   
  }
  