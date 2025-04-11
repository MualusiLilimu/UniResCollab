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
    registerFill:(req,res)=>{
        const { username, email, student_id, surname, password, role } = req.body;
        try {
            const newUser = new collection({
              name: username,
              email,
              student_id,
              surname,
              password,
              role
            });
        
            await newUser.save();
            res.send("✅ User registered successfully!");
          }
          catch (err) {
            console.error(err);
            res.send("❌ Registration failed");
          }
    }


   
  }
  