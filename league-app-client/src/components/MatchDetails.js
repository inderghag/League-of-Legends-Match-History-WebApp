import React, { useEffect } from 'react';
import ItemSet from './Items'
import Teams from './Teams'
import ChampIcon from './ChampionIcon'
import SummonerIcon from './SummonerSpell'

//Displays the individual match history containers with data
function MatchDetails(props) {
    const matchDetails = props.match;
    const handleAccountCallback = props.accountCallback;

    //API stat data of the searched user within match
    let searchedUser = '';
    let blueTeam = [];
    let redTeam = [];
    let winStatus;

    for(let i = 0; i < 10; i++)
    {
        //Finds the searched user specifically
        if(matchDetails.participantIdentities[i].player.summonerName === props.username)
        {
            searchedUser = matchDetails.participants[i];

            //Checks to see if match was won or loss for searched user
            if(searchedUser.stats.win)
            {
                winStatus = true;
            }
            else
            {
                winStatus = false;
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

    //Returns whether match was win or loss back to AccountDetail(Parent) to keep track of ratio
    useEffect(() => {
        if(handleAccountCallback)
        {
            let champStats = {
                championId: searchedUser.championId,
                kills: searchedUser.stats.kills,
                deaths: searchedUser.stats.deaths,
                assists: searchedUser.stats.assists,
                win: winStatus
            }
            handleAccountCallback(champStats);
        }
    })

    return (
        <div >
            <div className={`Match-Box-Container row ${winStatus === true ? 'Match-Win' : 'Match-Loss'}`}>
                <div className="col-3 User-Match-Stat-Container">
                    <ChampIcon championId={searchedUser.championId} applyClass="Champion-Head-Image"/>
                    
                    <div className="cols-1">
                        <SummonerIcon spellId = {searchedUser.spell1Id}/>
                        <SummonerIcon spellId = {searchedUser.spell2Id}/>
                    </div>

                    <div>
                        {searchedUser.stats.kills}/{searchedUser.stats.deaths}/{searchedUser.stats.assists}<br/>
                        {searchedUser.stats.deaths === 0 ? `Perfect` : ((searchedUser.stats.kills+searchedUser.stats.assists)/searchedUser.stats.deaths).toFixed(2) + ' KDA'}

                    </div>
                </div>
                <div className="col-5 Item-Container">
                    <ItemSet stats={searchedUser.stats}/>
                </div>
                <div className="col-4 All-Players-Container">
                    <Teams redTeam={redTeam} blueTeam={blueTeam}/>
                </div>
            </div>
        </div>
    );
}

export default MatchDetails;