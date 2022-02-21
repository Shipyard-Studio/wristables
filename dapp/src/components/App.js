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
import Footer from './Footer';
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
        <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <ProgressBar num={sectionInFocus}/>
        <Section bg={null} Component={Hero} />
        <Section bg={bg2} Component={TextSection} componentProps={{header: "About", body: "<div>Every Wrist Aficionado NFT time piece is customized and built in a unique colour and finish. With the first 10,000 pieces created using parts from a hypercar engine, that all have their function inside of the time piece itself. View our roadmap below to see what you will be able to do with your Wristable.</div>" }}/>
        <Section bg={bg3} Component={TextSection} componentProps={{header: "Community", body: "<div>Our owners become a part of a community of watch collectors and enthusiasts that can hold ontotheir time piece as it appreciates, or trade it and passalong the benefits to another collector.</div>"}}/>
        <Section bg={bg4} Component={TextSection} componentProps={{header: "Events", body: "<div>Early owners will have VIP access to the Wrist AficionadoConvention in Miami on April 14th, with a chance to win a one off custom NFT time piece that you will customize in person at the convention.</div>"}}/>
        <Section bg={bg5} Component={TextSection} componentProps={{header: "Membership", body: "<div>Your membership will give you first dibs atpurchasing any new releases from Wrist Aficionado. Along with access to private VIP events that can onlybe accessed with wallet verification.</div>"}}/>
        <Section bg={bg6} Component={TextSection} componentProps={{header: "Roadmap", body: "<div><b>10%</b> <s>Design 10,000 unique time pieces</s><br/><b>20%</b> Mint first 1,000 time pieces<br/><b>30%</b> Design Gen 2 of our watch<br/>Custom collection exclusive to Wrist Aficionado Convention<br/>Develop AR platform for owners to see their watch in real life<br/>Develop virtual accessory shop allowing owners to purchase upgrades<br/>Give away a watch from one of our boutiques, once the collection sells out</div>"}}/>
        {/* <Columns />
        <Brands /> */}
        {/* <Auction /> */}
        <Footer />
      </div>
    
  );
}

export default App;
