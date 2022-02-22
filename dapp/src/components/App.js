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
        {window.innerWidth < 800 ? <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} /> : <></> }
        <ProgressBar num={sectionInFocus}/>
        {console.log(walletAddress)}
        <Section bg={null} size={1} Component={Hero} componentProps={{walletAddress: walletAddress, connect: connectWallet}}/>
        <Section bg={bg2} size={1} Component={TextSection} componentProps={{header: "About", body: "<div>Every Wrist Aficionado NFT time piece is customized and built in a unique colour and finish. With the first 1,000 pieces created using moving parts from a hypercard engine, no two releases will be the same. View our roadmap below to see what you will be able to do with your time piece as we build out our project.</div>" }}/>
        <Section bg={bg3} size={1} Component={TextSection} componentProps={{header: "Community", body: "<div>Our owners become a part of a community of watch collectors and enthusiasts that can hold onto their time piece as it appreciates, or trade it and pass along the benefits to another collector. Join our Discord to be apart of our community.</div>"}}/>
        <Section bg={bg4} size={1} Component={TextSection} componentProps={{header: "Events", body: "<div>Early owners will have VIP access to the Wrist Aficionado Convention in Miami on April 7th, with a chance to win a one off custom NFT time piece that you will customize in person at the convention.  Several owners will also have the opportunity to win private dinners in New York City or Miami with the owners of Wrist Aficionado.</div>"}}/>
        <Section bg={bg5} size={1} Component={TextSection} componentProps={{header: "Membership", body: "<div>Your membership will give you first dibs at purchasing any new releases from Wrist Aficionado before we make them available to the general public. Along with access to private VIP events that can only be accessed with wallet verification.</div>"}}/>
        <Section bg={bg6} size={2} Component={TextSection} componentProps={{header: "Roadmap", body: "<div><b>15% | March</b><br/><ul><li>1,000 Metaverse hypercar engine watches</li><li>1,000 Solar system watches</li><li>GIVEAWAY 3-5 watches from our boutique to our watch club owners</li><ul/><br/><b>25% | April</b><br/><ul><li>1,000 Crypto watch designed around mining and trading ETH & BTC</li><li>1,000 Robotic watch based on robots and AI</li><li>1,000 Steam power built using parts from an old steam engine</li><li>GIVEAWAY 3-5 watches from our boutique to our watch club owners</li></ul><br/><b>35% | May</b><br/><ul><li>1,000 Custom Formula 1 watch for Miami F1</li><li>1,000 DJ watches built using only parts from a DJ deck</li><li>GIVEAWAY 3-5 watches from our boutique to our watch club owners</li></ul><br/><b>45% | June</b><br/><ul><li>1,000 Casino gaming watch inspired by Vegas & Macau</li><li>1,000 Space travel watch</li><li>GIVEAWAY 3-5 watches from our boutique to our watch club owners</li></ul><br/><b>55% | July</b><br/><ul><li>1,000 Formula E designed watch using parts from Electric F1 cars</li><li>1,000 Piece Uniques that will be fully customizable in our studio</li><li>GIVEAWAY 3-5 watches from our boutique to our watch club owners</li></ul><br/><b>75%</b><br/><ul><li>Develop AR platform to see your watch in real life</li></ul><br/><b>85%</b><br/><ul><li>Accessory store</li><li>Straps, Bracelets, Rings/Charms, Necklaces  </li></ul><br/><b>100%</b><br/><ul><li>Build virtual Wrist Aficionado boutqiue where you can accessorize your watch and buy real watches from our inventory. (NFT owners will get early access, and exclusive prices on watch purchases.</li><li>All of our owners can now enter the metaverse!</li></ul></div>"}}/>
        {/* <Columns />
        <Brands /> */}
        {/* <Auction /> */}
        <Footer />
      </div>
    
  );
}

export default App;
