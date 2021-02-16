import React from 'react';
import AccountDetail from './AccountDetail';

//Returns account details when there is account information loaded in
function Account(props){
    
    if(!props.accountData.isLoading)
    {
        return <AccountDetail user={props.accountData.user} matchHistory={props.accountData.matchHistory} />
    }
    return <p></p>
}

export default Account
