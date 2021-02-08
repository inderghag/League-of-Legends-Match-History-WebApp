import React from 'react';

//Returns summoner spell image
function SummonerSpell(props) {
    const summonerSpellFile = require('../static_data/summonerSpell.json');

    function getSummonerSpellImageURL(spellId){
        for(let spell in summonerSpellFile.data){
            if(summonerSpellFile.data[`${spell}`].key === spellId)
            {
                return `http://ddragon.leagueoflegends.com/cdn/11.2.1/img/spell/${summonerSpellFile.data[`${spell}`].image.full}`
            }
        }
    }
    return (
        <img 
            src={getSummonerSpellImageURL(`${props.spellId}`)}
            alt={props.spellId}
            className="Summoner-Spell-Image"
        />
    );
}

export default SummonerSpell;