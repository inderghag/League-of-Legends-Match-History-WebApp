import React from 'react';
import ChampIcon from './ChampionIcon';
import { GetChampion } from '../common/GetChampion';

//Display stats for top 3 most played recent champions for user
function RecentChampions(props) {
    let championsPlayed = props.championsPlayed;

    if(championsPlayed.values !== undefined)
    {
        //Orders champion list by amount of games each have been played
        let orderedChampsList = [];

        for(let games in championsPlayed)
        {
            orderedChampsList.push([championsPlayed[games]]);
        }
        orderedChampsList.sort((a, b) => b[0].games - a[0].games);

        for(let i = 0; i < 3 && i < orderedChampsList.length; i++)
        {
            orderedChampsList[i][0].name = GetChampion(`${orderedChampsList[i][0].championId}`).name;
        }

        return(
            <div className="col">
                <table style={{width:'100%',height: 194}}>
                    <tbody>
                    {
                        orderedChampsList.slice(0,3).map(champion =>{
                            return(
                                <tr className="table-light" key={champion[0].name}>
                                    <th>
                                        <ChampIcon championId={champion[0].championId} applyClass="Account-Champion-Head-Image"/>
                                    </th>
                                    <td style={{fontSize:14}}>
                                        {champion[0].name}<br />
                                        {(champion[0].won/champion[0].games)*100}% ({champion[0].won}W {champion[0].loss}L)&nbsp;
                                        {champion[0].deaths === 0 ? `Perfect`: ((champion[0].kills + champion[0].assists)/champion[0].deaths).toFixed(2)} KDA
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
    return <p>Loading...</p>
}

export default RecentChampions;