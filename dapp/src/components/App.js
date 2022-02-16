import React, {useEffect, useState} from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Columns from './Columns';
import Brands from './Brands';
import Auction from './Auction';
import Section from './Section';
import TextSection from './TextSection';
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
        <Section bg={bg2} Component={TextSection} componentProps={{header: "About", body: "Every Wrist Aficionado NFT time piece is customized and built in a unique colour and finish. With the first 10,000 pieces created using parts from a hypercar engine, that all have their function inside of the time piece itself. View our roadmap below to see what you will be able to do with your Wristable." }}/>
        <Section bg={bg3} Component={TextSection} componentProps={{header: "Community", body: "Our owners become a part of a community ofwatch collectors and enthusiasts that can hold ontotheir time piece as it appreciates, or trade it and passalong the benefits to another collector."}}/>
        <Section bg={bg4} Component={TextSection} componentProps={{header: "Events", body: "Early owners will have VIP access to the Wrist AficionadoConvention in Miami on April 14th, with a chance to win a one off custom NFT time piece that you will customize in person at the convention."}}/>
        <Section bg={bg5} Component={TextSection} componentProps={{header: "Membership", body: "Your tmembership will give you first dibs atpurchasing any new releases from Wrist Aficionado.Along with access to private VIP events that can onlybe accessed with wallet verification."}}/>
        <Section bg={bg6} Component={TextSection} componentProps={{header: "Roadmap", body: ""}}/>
        {/* <Columns />
        <Brands /> */}
        {/* <Auction /> */}
      </div>
    
  );
}

export default App;
