import React from 'react';

//Displays the win/loss of returned matches
function WinLoss(props) {
    let win = props.win;
    let loss = props.loss;
    return (
        <div>
            {win} : {loss}
        </div>
    );
}

export default WinLoss;