import React from 'react';
import { useState } from 'react';
import './style/bootstrap.min.css';
import './style/App.css';
import Search from './components/Search';
import Account from './components/Account';

function App() {
  //The initial account data of the user searched before passed on to get match history
  const [accountData, setAccountData] = useState({isLoading: true,});

  //Manages the callback with the intial search of the username
  function handleSearchCallback(data) {
    setAccountData({isLoading: false, ...data});
  }
  
  return (
    <div className="App">
      <Search appCallback={handleSearchCallback}/>

      <Account accountData={accountData} />
      
    </div>
  );
}

export default App;
