import React, {useEffect, useState, lazy, Suspense} from 'react';
import Modal from 'react-modal';
import Section from './Section';
import ProgressBar from './ProgressBar';
import Hero from './Hero';
import '../style/App.css';

const Sidebar = lazy(() => import('./Sidebar'));
const ModalForm = lazy(() => import('./ModalForm'));
const TextSection = lazy(() => import('./TextSection'));
const Footer = lazy(() => import('./Footer'));



function App() {

  const bg1 = '/optimized/1.jpg'
  const bg2 = '/optimized/2.jpg'
  const bg3 = '/optimized/3.jpg'
  const bg4 = '/optimized/4.jpg'
  const bg5 = '/optimized/5.jpg'
  const bg6 ='./optimized/6.jpg'

  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '20px',
      zIndex: 20
    },
  }

  Modal.setAppElement('#root');

  const [walletAddress, setWallet] = useState("")
  const [sectionInFocus, setSectionInFocus] = useState(0)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [pageWidth, setPageWidth] = useState(window.innerWidth)

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

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
    // getCurrentWalletConnected();
    addWalletListener(); 
    window.addEventListener("scroll", getInFocusSection)
    window.addEventListener("resize", () => {
      setPageWidth(window.innerWidth)
    })
  }, []); 

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="App" id="outer-container">
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={modalStyles}
          contentLabel="Example Modal"
          >
          <ModalForm closeModal={closeModal}/>
      </Modal>

        {pageWidth < 950 ? <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} /> : <></> }
        <ProgressBar num={sectionInFocus}/>
        <Section bg={null} size={1} Component={Hero} componentProps={{walletAddress: walletAddress, connect: connectWallet, openModal: openModal, pageWidth: pageWidth}}/>
        <Section bg={bg2} size={1} Component={TextSection} componentProps={{header: "About", body: "<div>Every Wrist Aficionado Mint is customized and built in a unique colour and finish. With the first 1,000 pieces created using moving parts from a Hypercar Engine. V1 of our roadmap consists of 10,000 watches total, with every 1,000 released being a different design. View our roadmap below to see what you will be able to do with your time piece as we build out our project.</div>" }}/>
        <Section bg={bg3} size={1} Component={TextSection} componentProps={{header: "Community", body: "<div>As a Wrist Aficionado Watch Club (WAWC) holder, you will gain access to private collector events, dinners, and have first dibs on new pieces in our boutiques at exclusive prices before they become available to the public. Get started by <a href='https:discord.com/invite/cJpYAvJhTG'>joining our Discord</a> community and stay up to date with each release</div>", emailCapture: true}}/>
        <Section bg={bg4} size={1} Component={TextSection} componentProps={{header: "Events", body: "<div>Holders will have access to our VIP events in various different cities, and have the opportunity to meet with some of the worlds top collectors in the Wrist Aficionado network. </div>"}}/>
        <Section bg={bg5} size={1} Component={TextSection} componentProps={{header: "Bitcoin 2022", body: "<div>Come see us at Bitcoin 2022 in Miami Beach, where we will be showcasing some of our rarest pieces, as well as announcing the mint date for WAWC. Active community members that are in Miami between the 6th-9th will be invited to our boutique located in the Setai hotel for a private tour.</div>"}}/>
        <Section bg={bg6} size={2} Component={TextSection} componentProps={{header: "Roadmap", body: "<div><b>15% | May</b><br/><ul>        <li>1,000 Crypto Watch</li>        <li>GIVEAWAY 3-5 Watches from our boutique to our watch club members</li>        <ul/><br/><b>20% | June</b><br/><ul>        <li>1,000 Formula 1 Watch for Miami F1</li>        <li>GIVEAWAY 3-5 Watches from our boutique to our watch club members</li>    </ul><br/><b>25% | July</b><br/><ul>         <li>1,000 DJ Watch</li>        <li>GIVEAWAY 3-5 watches from our boutique to our watch club members</li></ul><br/><b>30% | August</b><br/><ul>        <li>1,000 Steam Power Watch</li>          <li>GIVEAWAY 3-5 watches from our boutique to our watch club members</li></ul><br/><b>35% | September</b><br/><ul>        <li>1,000 Casino Watch inspired by Vegas & Macau</li>        <li>GIVEAWAY 3-5 watches from our boutique to our watch club members</li></ul><br/><b>40% | October</b>    <br/>    <ul>            <li>1,000 Solar System Watch</li>            <li>GIVEAWAY 3-5 Watches from our boutique to our watch club members </li>    </ul>    <br/><b>45% | November</b><br/><ul>        <li>1,000 Robotic Watch</li>    <li>GIVEAWAY 3-5 Watches from our boutique to our watch club members</li></ul><br/><b>50% | December</b><br/><ul>        <li>1,000 Time Machine Watch</li>      <li>GIVEAWAY 3-5 Watches from our boutique to our watch club members</li>  <br/></ul><br/><b>55% | January </b><br/><ul>        <li>1,000 Formula E Watch</li>      <li>GIVEAWAY 3-5 Watches from our boutique to our watch club members</li>  <br/></ul><br/><b>70%</b><br/><ul>        <li>1,000 Piece Uniques that will be fully customizable in our studio</li>      <li>Develop AR platform to see your watch in real life</li>  <br/></ul><br/><b>85%</b><br/><ul>        <li>Accessory store launch</li><br/></ul><br/><b>100%</b><br/><ul>        <li>Build Virtual Wrist Aficionado boutique where you can accessorize your watch        and buy real watches from our inventory. ( WA members will get early access, and        exclusive prices on watch purchases).    </li>    </br>    <li>All of our members can now enter Web3 with our All World Access Pass (AWAP).</li><br/></ul></div>"}}/>
        <Footer />
      </div>
    </Suspense>
    
  );
}

export default App;
