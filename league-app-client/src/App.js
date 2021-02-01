import React from 'react';
import { useState } from 'react';
import './style/bootstrap.min.css';
import './style/App.css';
import Search from './components/Search';
import Account from './components/Account';

function App() {
  const [accountData, setAccountData] = useState({isLoading: true,});

  function handleSearchCallback(data) {
    setAccountData({isLoading: false, ...data});
    console.log(accountData);
  }
  
  return (
    <div className="App">
      <Search appCallback={handleSearchCallback}/>

      <Account accountData={accountData} />
      
    </div>
  );
}

export default App;
