import React from 'react';
import ItemSet from './Items'
import Teams from './Teams'
import ChampIcon from './ChampionIcon'

//Displays the individual match history containers with data
function MatchDetails(props) {
    const matchDetails = props.match;
    const championFile = require('../static_data/championList.json');
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
            <div className="Match-Box-Container row">
                <div className="col-md-3 User-Match-Stat-Container">
                    <ChampIcon championId={searchedUser.championId} applyClass="Champion-Head-Image"/>
                    
                    <div className="cols-md-1">
                        <img src={getSummonerSpellImageURL(`${searchedUser.spell1Id}`)}
                            alt={searchedUser.spell1Id}
                            className="Summoner-Spell-Image"
                        />
                        <img src={getSummonerSpellImageURL(`${searchedUser.spell2Id}`)}
                            alt={searchedUser.spell1Id}
                            className="Summoner-Spell-Image"
                        />
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