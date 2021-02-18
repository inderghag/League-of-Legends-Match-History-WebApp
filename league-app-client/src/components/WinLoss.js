import React from 'react';
import { Pie } from 'react-chartjs-2';

//Displays the win/loss of returned matches
function WinLoss(props) {
    let winLossRate = props.winLossRate;
    if(winLossRate !== undefined)
    {
        let winPercent = ((winLossRate.win/(winLossRate.loss+winLossRate.win))*100).toFixed(0);
        const data = {
            labels: [
                'Win',
                'Loss'
            ],
            datasets: [{
                data: [
                    winLossRate.win,
                    winLossRate.loss
                ],
                backgroundColor: [
                    '#b5e0ff',
                    '#ffb8a3'
                ],
            }],
        }

        const option = {
            legend: {
                display: false,
            },
        }; 
    
        return (
            <div className="Win-Loss-Container">
                <Pie
                    data={data} 
                    width={198}
                    height={120}
                    options={option}
                />
                
                <p style={{color:'black'}}>{winPercent}% win rate<br />
                    {winLossRate.win+winLossRate.loss} Games {winLossRate.win} Won {winLossRate.loss} Loss</p>
            </div>
        );
    }
    return <p></p>
}

export default WinLoss;