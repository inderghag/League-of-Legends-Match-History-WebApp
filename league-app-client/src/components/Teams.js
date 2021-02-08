import React from 'react';
import ChampIcon from './ChampionIcon';

//Displays the players from each team in the match
function Teams(props) {
    const blueTeam = props.blueTeam;
    const redTeam = props.redTeam;

    function displayPlayer(player) {
        return (
            <div className="Summoner-Light-Detail">
                <ChampIcon championId={player.championId} applyClass="Teammate-Champion-Head-Image"/>
                {player.summonerName}
            </div>
        );
    }

    return (
        <div className="row">
            <div className="col-md-6 Team-Container">
                {blueTeam.map(player => {
                    return displayPlayer(player);
                })}
            </div>
            <div className="col-md-6 Team-Container">
                {redTeam.map(player => {
                    return displayPlayer(player);
                })}
            </div>
        </div>
    );
}

export default Teams;