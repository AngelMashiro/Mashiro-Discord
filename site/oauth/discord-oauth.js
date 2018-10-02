const express = require('express');
const config = require('../../config.json');
const btoa = require('btoa');
const fetch = require('node-fetch');
const router = express.Router();

const CLIENT_ID = config.client_id;
const CLIENT_SECRET = config.client_secret;
const redirect = encodeURIComponent('http://localhost/oauth/discord/callback');
const scopes = "identify connections rpc.notifications.read";
let lastid = 10000;

router.get('/login', (req, res) => {
  res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${CLIENT_ID}&scope=${scopes}&response_type=code&redirect_uri=${redirect}`);
});

router.get('/callback', async (req, res) => {
    if (!req.query.code) throw new Error('NoCodeProvided');
    const code = req.query.code;
    const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
    const response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${creds}`,
        },
      });
    const json = await response.json();

    req.login(lastid, err => {
        if (err)
            res.redirect('/');
    });
    lastid++;

    res.redirect(`/?token=${json.access_token}`);
});

module.exports = router;