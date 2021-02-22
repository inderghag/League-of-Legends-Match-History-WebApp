import React, { useState, useEffect } from 'react';
import WinLoss from './WinLoss';
import MatchDetails from './MatchDetails';
import RecentChampions from './RecentChampions';

//Provides the details for user account
function AccountDetail(props) {
    //The complete match history of user
    const matchData = props.matchHistory;
    //Used to track win/loss rate and champion stats across those games
    const [accountStats, setAccountStats] = useState({winLoss: {}, champsPlayed: {}});
    let win=0, loss=0;
    let champsPlayed = new Map();
    //Passed down account data
    const adata = props.user;

    function accountCallback(data)
    {
        if(!(data.championId in champsPlayed))
        {
            champsPlayed[data.championId] = {
                championId: data.championId,
                kills: 0,
                deaths: 0,
                assists: 0,
                won: 0,
                loss: 0,
                games: 0
            };
        }
        champsPlayed[data.championId].kills += data.kills;
        champsPlayed[data.championId].deaths += data.deaths;
        champsPlayed[data.championId].assists += data.assists;
        champsPlayed[data.championId].games += 1;

        if(data.win)
        {
            champsPlayed[data.championId].won++;
            win++;
        }
        else
        {
            champsPlayed[data.championId].loss++;
            loss++;
        }
        
    }

    useEffect(() => {
        setAccountStats({
            winLoss: {
                win: win,
                loss: loss,
            },
            champsPlayed: champsPlayed
        });
    }, [win, loss])

    
    //Passes match individually to components to be worked on
    return(
        <div>
            <div className="Account-Stat-Container row">
                <WinLoss className="col-4 Win-Loss-Container" winLossRate={accountStats.winLoss} />
                <RecentChampions className="col-5" championsPlayed={accountStats.champsPlayed}/>
                <p className="col-3 Recent-Position-Container">text2</p>
            </div>
            {
                matchData.map(match => {
                    return <MatchDetails match={match} username={adata.name} key={match.gameId} accountCallback={accountCallback} /> 
                })
            }
            
        </div>
    );
}

export default AccountDetail;