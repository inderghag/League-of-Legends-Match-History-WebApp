import React, { useState, useEffect } from 'react';
import MatchDetails from './MatchDetails';
import WinLoss from './WinLoss';
import RecentChampions from './RecentChampions';
import LaneStats from './LaneStats';

//Provides the details for user account
function AccountDetail(props) {
    //The complete match history of user
    const matchData = props.matchHistory;
    const adata = props.user;
    //Used to track win/loss rate and champion stats across those games
    const [accountStats, setAccountStats] = useState({
        winLoss: {}, 
        champsPlayed: {}, 
        laneStats: {}
    });
    let win=0, loss=0;
    let champsPlayed = new Map();
    let laneDetails = new Map();
    //Passed down account data

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
        
        laneMatchAdd(data.lane, data.role, data.win);
    }

    /**
     * Tracking lane stats
     * @param {string} lane 
     * @param {string} role
     * @param {boolean} wl 
     */    
    function laneMatchAdd(lane, role, wl)
    {
        if(!(lane in laneDetails))
        {
            laneDetails[lane] = {};
            let position = lane!=='BOTTOM' ? lane : (role === 'DUO_CARRY' ? 'ADC' : 'SUPPORT');
            laneDetails[lane][role] = {
                position: position,
                won: 0,
                games: 0,
            }
        }

        if(!(role in laneDetails[lane]))
        {
            laneDetails[lane][role] = {
                won: 0,
                games: 0,
            }
        }

        if(wl)
        {
            laneDetails[lane][role].won++;
        }
        laneDetails[lane][role].games++;
    }

    useEffect(() => {
        setAccountStats({
            winLoss: {
                win: win,
                loss: loss,
            },
            champsPlayed: champsPlayed,
            laneStats: laneDetails,
        });
    }, [win, loss])

    return(
        <div>
            <div className="Account-Stat-Container row" style={{color:'black'}}>
                <div className="col-4">
                    <p>Win Rate</p>
                    <WinLoss winLossRate={accountStats.winLoss} />
                </div>
                <div className="col-5 Remove-Padding">
                    <p>Most Played Recent Champions</p>
                    <RecentChampions championsPlayed={accountStats.champsPlayed} />
                </div>
                <div className="col-3 Remove-Padding">
                    <p>Most Played Roles</p>
                    <LaneStats  laneDetails={accountStats.laneStats} />
                </div>
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