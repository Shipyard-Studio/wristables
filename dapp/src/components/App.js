import React, {useEffect, useState} from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Columns from './Columns';
import Brands from './Brands';
import Auction from './Auction';
import Section from './Section';
import ProgressBar from './ProgressBar';
import Hero from './Hero';
import '../style/App.css';



function App() {

  const bg1 = '/WASiteAssets/bg1.png'
  const bg2 = '/WASiteAssets/bg2.png'
  const bg3 = '/WASiteAssets/bg3.png'
  const bg4 = '/WASiteAssets/bg4.png'
  const bg5 = '/WASiteAssets/bg5.png'
  const bg6 ='./WASiteAssets/bg6.png'

  const [walletAddress, setWallet] = useState("")
  const [sectionInFocus, setSectionInFocus] = useState(0)

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

  function getInFocusSection() {
    let screenHeight = window.innerHeight;
    let section = Math.round(window.scrollY / screenHeight)
    if (section !== sectionInFocus || section === 0) setSectionInFocus(section)
  }
  
  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener(); 
    window.addEventListener("scroll", getInFocusSection)
  }, []); 

  return (
    
      <div className="App" id="outer-container">
        {/* <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} /> */}
        <ProgressBar num={sectionInFocus}/>
        <Section bg={bg1} Component={Hero} />
        <Section bg={bg2} />
        <Section bg={bg3} />
        <Section bg={bg4} />
        <Section bg={bg5} />
        <Section bg={bg6} />
        {/* <Columns />
        <Brands /> */}
        {/* <Auction /> */}
      </div>
    
  );
}

export default App;
