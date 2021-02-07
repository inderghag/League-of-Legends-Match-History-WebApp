import React from 'react';

//Returns the champion icons
function ChampionIcon(props) {
    const championFile = require('../static_data/championList.json');

    //Gets the icon from the static file
    //Static file champion id key is stored as key so the parameter id passed in also has
    //to be a string value
    function getChampIcon(champId)
    {
        for(let champion in championFile.data){
            if(championFile.data[`${champion}`].key === champId)
            {
                return `http://ddragon.leagueoflegends.com/cdn/11.2.1/img/champion/${championFile.data[`${champion}`].image.full}`;
            }
        }
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