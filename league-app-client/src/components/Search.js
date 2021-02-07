import React, { useState } from 'react'

//Search component for account name
function Search(props) {
    //The name being typed
    const [name, setName] = useState('');

    const handleNameUpdate = (text) => {
        setName(text);
    };

    //Calls back the passed function from App.js to return account information of searched user
    //GET function called for user 'account' data
    async function getSearch (){

        let adata = await fetch(`/account?username=${name}`)
            .then(res => res.json())
            .then(res => {return res;});

        props.appCallback(adata);
    };

    return (
        <div>
            <h1>League Account Stat Search</h1>
            <div>
                Username: 
                <input type='text' onChange={(text) => handleNameUpdate(text.target.value)}/>
                <button onClick={() => getSearch()}> Search </button>
            </div>
        </div>
    )
}

export default Search;
