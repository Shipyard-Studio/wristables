import React from 'react';
import {useEffect, useState} from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Columns from './Columns';
import Brands from './Brands';
import Auction from './Auction';
import Section from './Section';
import Hero from './Hero';
import '../style/App.css';
import bg1 from '../../public/WASiteAssets/bg1.png'
import bg2 from '../../public/WASiteAssets/bg2.png'
import bg3 from '../../public/WASiteAssets/bg3.png'
import bg4 from '../../public/WASiteAssets/bg4.png'
import bg5 from '../../public/WASiteAssets/bg5.png'
import bg6 from'../../public/WASiteAssets/bg6.png'
import { ParallaxProvider } from 'react-scroll-parallax';


function App() {

  const [walletAddress, setWallet] = useState("");

  async function connectWallet() {
      if (window.ethereum) {
        try {
          const addressArray = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setWallet(addressArray[0]);
        } catch {
          setWallet("");
        }
      } else {
        setWallet("");
        alert("Please install a wallet in your browser!");
      }
  }

  async function getCurrentWalletConnected() {

    if (window.ethereum){
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (addressArray.length > 0) {
          setWallet(addressArray[0]);
        } else {
          setWallet("");
        }
      } catch {
        setWallet("");
      }
    }
  }

  function addWalletListener() {
    if (window.ethereum){
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
        } else {
          setWallet("");
        }
      })
    } 
  }

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener(); 
  }, []); 

  return (
    <ParallaxProvider>

      <div className="App" id="outer-container">
        {/* <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} /> */}
        <Section bg={} Component={Hero}/>
        {/* <Columns />
        <Brands /> */}
        {/* <Auction /> */}
      </div>
    </ParallaxProvider>
  );
}

export default App;
