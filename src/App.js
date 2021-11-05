import React, { useState, useCallback, useEffect } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';
import { EthWallet} from './utils/walletContext';
import WalletButton from './components/walletbutton/connectWallet';
import { usePlayerCharacters } from './hooks/hooks';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;


function useWallet(){
  const [acct, setAcct ] = useState("");
  const [minting, setMinting] = useState(false);
  
  const checkConnectedWallet = useCallback(async ()=>{
    try{
      const {ethereum} = window;
    if (!ethereum){
        return;
    } else {
      const accounts = await ethereum.request({ method: 'eth_accounts'});
      if (accounts.length !== 0){
        const account = accounts[0];
        setAcct(account);
      } else{
        console.log('error: No authorized account found')
      }
    }
  } catch (error){
      console.log(error);
    }
  }, []);

    const connectWallet = async()=>{
      try{
        const {ethereum} = window;
      if (!ethereum){
          return;
      } else {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts'});
        setAcct(accounts[0]);
       
    }
  } catch (error) {
    console.log(error);
  }
};


    useEffect(()=>{
      connectWallet();
      
    },[]);



    return { acct, checkConnectedWallet, connectWallet, minting, setMinting};


};




const App = () => {

  const ethWallet = useWallet();


  return (
  
    <div className="App">
      <EthWallet.Provider value={ethWallet}>
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">⚔️ Metaverse Slayer ⚔️</p>
          <p className="sub-text">Team up to protect the Metaverse!</p>
          <div className="connect-wallet-container">
            <img
              src="https://64.media.tumblr.com/tumblr_mbia5vdmRd1r1mkubo1_500.gifv"
              alt="Monty Python Gif"
            />
            <WalletButton />
          </div>
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built with @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
      </EthWallet.Provider>
    </div>
  );
};

export default App;
