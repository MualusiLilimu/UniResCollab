const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const path = require('path')

const app = express()
const port = 3000

// Set the static folder(frontEnd folder) 
app.use(express.static(path.join(__dirname, 'FrontEnd', 'public')))

// Set the views folder from the FrontEnd folder
app.set('views', path.join(__dirname, 'FrontEnd', 'views'))

// Set templating engine
app.use(expressLayouts)
app.set('layout', 'layouts'); // this points to layouts.ejs inside FrontEnd/views
app.set('view engine', 'ejs')

// Routes to different screens
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/Register', (req, res) => {
    res.render('Register')
})

app.get('/ResearcherHome', (req, res) => {
    res.render('ResearcherHome')
})

app.get('/ReviewerHome', (req, res) => {
    res.render('ReviewerHome')
})

app.get('/AdminHome', (req, res) => {
    res.render('AdminHome')
})

app.get('/roles', (req, res) => {
    res.render('roles')
})

app.get('/login/researcher', (req, res) => { 
    res.render('login', { role: 'Researcher' })
})

app.get('/login/reviewer', (req, res) => {
    res.render('login', { role: 'Reviewer' })
})

app.get('/login/admin', (req, res) => {
     res.render('login', { role: 'Admin' })
})

app.get('/forgotPassword', (req, res) => {
    res.render('forgotPassword')
})



// Start server
app.listen(port, () => console.info(`App listening on port ${port}`))
