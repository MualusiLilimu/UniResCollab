module.exports = {
    welcome:(req,res)=>{
        res.render('index');
    },
    register:(req,res)=>{
        res.render('Register');
    },
    AdminHome:(req,res)=>{
        res.render('AdminHome.ejs');
    },
    ResearcherHome:(req,res)=>{
        res.render('ResearcherHome.ejs');
    },
    ReviwHome:(req,res)=>{
        res.render('ResearcherHome.ejs');
    }


   
  }
  