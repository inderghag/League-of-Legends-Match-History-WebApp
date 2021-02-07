import React, { useState, useEffect } from 'react';
import MatchDetails from './MatchDetails';

//Gets user match history by using passed in account data and displays match history
function Account(props){
    //The complete match history of user
    const [matchData, setMatchData] = useState();
    //Passed down account data
    const adata = props.accountData;

    //Loads the matchData variable on load
    //GET function for all match data
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

    //Passes match individually to components to be worked on
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
