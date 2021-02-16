import React from 'react';

function Items(props) {
    const itemFile = require('../static_data/itemList.json')
    let itemIds = [];
    let trinket;

    for(let i = 0; i < 7; i++)
    {
        itemIds.push(props.stats[`item${i}`]);
        
    }
    itemIds.sort((a,b) => b - a);

    function getItem(itemId, index){
        if(itemId === 0)
        {
            return <span className="Little-Square" key={index}/>
        }
        return(
            <img 
            src={`http://ddragon.leagueoflegends.com/cdn/11.2.1/img/item/${itemId}.png`}
            alt={itemFile.data[`${itemId}`]}
            className="Little-Square"
            key={index}
            />
        )
    }

    return(
        <div>
            {itemIds.map((id, index) => {return getItem(id, index)})}
        </div>
    )


}

export default Items;