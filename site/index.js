const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const config = require('../config.json');
const session = require('express-session');
const passport = require('passport');
let lastid = 1;

// Middleware
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(session({
    secret: config.session_secret,
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')))
app.use('/oauth/discord', require('./oauth/discord-oauth'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/');
        return;
    }
    
    new Promise((res, rej) => rej('Cannot read property of undefined.'));
    res.render('login');
})

app.get('/', (req, res) => {
    if (req.isAuthenticated()) 
        res.render('console');
    else
        res.redirect('/login');
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.pass;

    if (username === "Jules" && password === "meme") {
        req.login(lastid, err => {
            res.redirect('/');
        });
        lastid++;
    }
    else {
        res.redirect('/login?loginFailed=true');
    }
})

passport.serializeUser((id, done) => {
    done(null, id);
});
  
passport.deserializeUser((id, done) => {
    done(null, id);
});

app.listen(80);
console.log("Listening on port 80")

process.on('unhandledRejection', err => {
    console.error(err.stack)
})