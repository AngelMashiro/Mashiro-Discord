const path = require('path');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'))

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/', (req, res) => {
    // check if is logged in
    res.redirect('/login');
});

app.listen(80);
console.log("Listening on port 80")