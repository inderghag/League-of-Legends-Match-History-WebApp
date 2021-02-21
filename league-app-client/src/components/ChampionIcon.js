import React from 'react';
import {GetChampion} from '../common/GetChampion';

//Returns the champion icons
function ChampionIcon(props) {

    //Gets champion data and returns image link
    function getChampIcon(champId)
    {
        let champion = GetChampion(champId);
        return `http://ddragon.leagueoflegends.com/cdn/11.2.1/img/champion/${champion.image.full}`;
    }

    return(
        <img 
            src={getChampIcon(`${props.championId}`)}
            alt={props.championId}
            className={`${props.applyClass}`}
        />
    )
}

export default ChampionIcon;