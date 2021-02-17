import React, { useState, useEffect } from 'react';
import WinLoss from './WinLoss';
import MatchDetails from './MatchDetails';

//Provides the details for user account
function AccountDetail(props) {
    //The complete match history of user
    const matchData = props.matchHistory;
    //Used to track whether games were a win or loss and send to WinLoss element
    const [winLossRate, setWinLoss] = useState();
    let win=0, loss=0;
    //Passed down account data
    const adata = props.user;

    function winLossCallback(data)
    {
        if(data)
        {
            win++;
        }
        else
        {
            loss++;
        }
        
    }

    useEffect(() => {
        setWinLoss({win: win, loss: loss});       
    }, [win, loss])
    
    //Passes match individually to components to be worked on
    return(
        <div>
            <div className="Account-Stat-Container row">
                <WinLoss className="col-4" winLossRate={winLossRate} />
                <p className="col-4">text1</p>
                <p className="col-4">text2</p>
            </div>
            {
                matchData.map(match => {
                    return <MatchDetails match={match} username={adata.name} key={match.gameId} winLossCallback={winLossCallback} /> 
                })
            }
            
        </div>
    );
}

export default AccountDetail;