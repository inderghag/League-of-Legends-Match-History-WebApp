import React from 'react';
import { Pie } from 'react-chartjs-2';

//Displays the win/loss of returned matches
function WinLoss(props) {
    let winLossRate = props.winLossRate;
    if(winLossRate !== undefined)
    {
        const data = {
            labels: [
                'Win',
                'Loss'
            ],
            datasets: [{
                data: [winLossRate.win, winLossRate.loss],
                backgroundColor: [
                    '#b5e0ff',
                    '#ffb8a3'
                ],
            }],
        }
    
        return (
            <div>
                <Pie
                    data={data} 
                    width={300}
                    height={150}
                    options={{maintainAspectRatio: false}}
                />
            </div>
        );
    }
    return <p></p>
}

export default WinLoss;