module.exports = {
    welcome:(req,res)=>{
        res.render('index');
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
        res.render('login.ejs');
    }


   
  }
  