import React, { useState, useEffect } from 'react';
import MatchDetails from './MatchDetails';

function Account(props){
    const [matchData, setMatchData] = useState();
    const adata = props.accountData;

    useEffect(() => {
        if(!adata.isLoading)
        {
            async function getData(){
                setMatchData(JSON.parse(
                    await fetch(`./matchstats?accountId=${adata.accountId}`)
                        .then(res => res.json())
                        .then(res => {return res})
                ));
            }
            getData();
        }
    }, [adata]);

    if(matchData)
    {
        return(
            <div>
                {
                    matchData.map(match => {
                       return <MatchDetails match={match} username={adata.name}/> 
                    })
                }
                
            </div>
        );
    }
    return <p></p>
}

export default Account
