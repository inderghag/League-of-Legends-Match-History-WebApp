require('dotenv').config();
var express = require('express');
var router = express.Router();

let fetch = require('node-fetch');

let header = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    "Origin": "https://developer.riotgames.com",
    "X-Riot-Token": process.env.RIOT_API_KEY,
}

//GET account info and match history and returns in one object
router.get('/', function(req, res, next) {
    let url_SummonerAPI = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.query.username}`;
    fetch(url_SummonerAPI, {headers: header})
        .then(data => data.json())
        .then(data => res.json(data));
});

module.exports = router;