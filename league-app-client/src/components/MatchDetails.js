import React from 'react';
import ItemSet from './Items'
import Teams from './Teams'
import ChampIcon from './ChampionIcon'
import SummonerIcon from './SummonerSpell'

//Displays the individual match history containers with data
function MatchDetails(props) {
    const matchDetails = props.match;
    const summonerSpellFile = require('../static_data/summonerSpell.json');

    //API stat data of the searched user within match
    let searchedUser = '';
    let blueTeam = [];
    let redTeam = [];

    for(let i = 0; i < 10; i++)
    {
        //Finds the searched user specifically
        if(matchDetails.participantIdentities[i].player.summonerName === props.username)
        {
            searchedUser = matchDetails.participants[i];

            //Checks to see if match was won or loss for searched user
            if((searchedUser.teamId === 100 && matchDetails.teams[0].win === "Win")
            || (searchedUser.teamId === 200 && matchDetails.teams[1].win === "Win"))
            {
                searchedUser = {...searchedUser, win: true};
            }
            else
            {
                searchedUser = {...searchedUser, win: false};
            }
        }
        
        //Adds to blue team if teamid is '100' or red team if id '200', also pushes username from participantsIdentities
        if(matchDetails.participants[i].teamId === 100)
        {
            blueTeam.push({...matchDetails.participants[i], summonerName: matchDetails.participantIdentities[i].player.summonerName});
            
        }
        else
        {
            redTeam.push({...matchDetails.participants[i], summonerName: matchDetails.participantIdentities[i].player.summonerName});
        }
        
    }

    function getSummonerSpellImageURL(spellId){
        for(let spell in summonerSpellFile.data){
            if(summonerSpellFile.data[`${spell}`].key === spellId)
            {
                return `http://ddragon.leagueoflegends.com/cdn/11.2.1/img/spell/${summonerSpellFile.data[`${spell}`].image.full}`
            }
        }
    }

    return (
        <div >
            <div className={`Match-Box-Container row ${searchedUser.win === true ? 'Match-Win' : 'Match-Loss'}`}>
                <div className="col-md-3 User-Match-Stat-Container">
                    <ChampIcon championId={searchedUser.championId} applyClass="Champion-Head-Image"/>
                    
                    <div className="cols-md-1">
                        <SummonerIcon spellId = {searchedUser.spell1Id}/>
                        <SummonerIcon spellId = {searchedUser.spell2Id}/>
                    </div>

                    <div>
                        {searchedUser.stats.kills}/{searchedUser.stats.deaths}/{searchedUser.stats.assists}<br/>
                        {searchedUser.stats.deaths === 0 ? `Perfect` : ((searchedUser.stats.kills+searchedUser.stats.assists)/searchedUser.stats.deaths).toFixed(2) + ' KDA'}

                    </div>
                </div>
                <div className="col-md-5 Item-Container Image-Container">
                    <ItemSet stats={searchedUser.stats}/>
                </div>
                <div className="col-md-4 All-Players-Container">
                    <Teams redTeam={redTeam} blueTeam={blueTeam}/>
                </div>
            </div>
        </div>
    );
}

export default MatchDetails;