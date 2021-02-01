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

//Gets a list of the last 100 matches played from an account and returns only the matchIDs
async function getMatchIds(url_MatchListAPI){
    let response = await fetch(url_MatchListAPI, {headers: header});
    response = await response.json();
    const midArr = await response.matches.map(element => {
        return element.gameId;
    });
    return midArr;
}

//Returns details about the match giving the specific matchID url
async function getMatchDetails(url_MatchDetailsAPI){
    let response = await fetch(url_MatchDetailsAPI, {headers: header})
    response = await response.json();
    return response;
}

router.get('/', function(req, res, next){
    let url_MatchListAPI = `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${req.query.accountId}`;

    getMatchIds(url_MatchListAPI)
    .then(async matchIds => {
        const midArr = [...matchIds.slice(0,5)];
        
        const mhistoryArr = [];

        for(let i = 0; i < midArr.length; i++)
        {
            let url_MatchDetailsAPI = `https://na1.api.riotgames.com/lol/match/v4/matches/${midArr[i]}`;
            mhistoryArr.push(await getMatchDetails(url_MatchDetailsAPI));
        }

        return mhistoryArr;
    })
    .then(mdetail => JSON.stringify(mdetail))
    .then(data => res.json(data));
    
});

module.exports = router;