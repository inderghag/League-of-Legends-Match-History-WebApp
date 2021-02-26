import React from 'react';

function LaneStats(props) {
    let laneDetails = props.laneDetails;
    if(laneDetails !== undefined)
    {
        let orderedLanes = [];

        for(let lane in laneDetails)
        {
            for(let role in laneDetails[lane])
            {
                orderedLanes.push(laneDetails[lane][role]);
            }
        }

        orderedLanes.sort((a,b) => b.games - a.games);

        return(
            <div>
                { <table style={{width:'100%'}} className="table-hover">
                    <tbody>
                    {
                        orderedLanes.slice(0, 2).map(lane =>{
                            return(
                                <tr key={lane.position}>
                                    <th>
                                        {lane.position}
                                    </th>
                                    <td style={{fontSize:14, paddingBottom:15}}>
                                        {(lane.won/lane.games).toFixed(0)}% Win Rate <br/>
                                        {lane.games} Games Played
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                }
            </div>
        )
    }
    return (
        <div>
            
        </div>
    );
}

export default LaneStats;