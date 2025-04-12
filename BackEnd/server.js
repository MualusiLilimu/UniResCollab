const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('./config/passport');
const authRoutes = require('./Routes/authRoutes');
const userRoute = require('./Routes/userRoutes');
const expressLayouts = require('express-ejs-layouts');

const { DB } = require('./config/database');


const app = express();
const PORT = 4000;

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', 'layouts');
app.set('views', path.join(__dirname, '..','FrontEnd', 'views'));
app.use(express.static(path.join(__dirname, '..','FrontEnd')));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({secret: "secret",resave: false,saveUninitialized: true}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth',authRoutes);
app.use('/', authRoutes);


app.get('/Admin/Home', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  res.send(`Welcome ${req.user.displayName}! <a href="/logout">Logout</a>`);
});

// Logout
app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/login');
  });
});


app.use('/', userRoute);


const startServer = async () => {
  try {
    await DB();
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server due to DB error", err);
  }
};

startServer();
