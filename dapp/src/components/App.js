import React, {useEffect, useState, lazy, Suspense} from 'react';
import Modal from 'react-modal';
import Section from './Section';
import ProgressBar from './ProgressBar';
import Hero from './Hero';
import '../style/App.css';
import getModalStyle from '../helpers/modalStyles'

const Sidebar = lazy(() => import('./Sidebar'));
const ModalForm = lazy(() => import('./ModalForm'));
const EmailModalForm = lazy(() => import('./EmailModalForm'));
const TextSection = lazy(() => import('./TextSection'));
const Footer = lazy(() => import('./Footer'));



function App() {

  const bg1 = '/optimized/1.jpg'
  const bg2 = '/optimized/2.jpg'
  const bg3 = '/optimized/3.jpg'
  const bg4 = '/optimized/4.jpg'
  const bg5 = '/optimized/5.jpg'
  const bg6 ='./optimized/6.jpg'

  Modal.setAppElement('#root');

  const [walletAddress, setWallet] = useState("")
  const [sectionInFocus, setSectionInFocus] = useState(0)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [emailModalIsOpen, setIsEmailModalOpen] = useState(false)
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

  function openEmailModal() {
    setIsEmailModalOpen(true);
  }

  function afterOpenEmailModal() {
    // subtitle.style.color = '#f00';
  }

  function closeEmailModal() {
    setIsEmailModalOpen(false);
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
          // style={getModalStyle()}
          contentLabel="Piece Unique Modal"
          className="modal"
          >
          <ModalForm closeModal={closeModal}/>
      </Modal>
      <Modal
          isOpen={emailModalIsOpen}
          onAfterOpen={afterOpenEmailModal}
          onRequestClose={closeEmailModal}
          // style={getModalStyle()}
          contentLabel="Email Modal"
          className="email-modal"
          >
          <EmailModalForm closeModal={closeEmailModal}/>
      </Modal>

        {pageWidth < 950 ? <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} /> : <></> }
        {/* <ProgressBar num={sectionInFocus}/> */}
        <Section bg={null} size={1} Component={Hero} id="home" componentProps={{walletAddress: walletAddress, connect: connectWallet, openModal: openModal, pageWidth: pageWidth}}/>
        <Section bg={bg2} size={1} Component={TextSection} id="about" componentProps={{header: "About", image: "/assets/Watch Still 01.png", roadmap: true, body: "<div>Every Wrist Aficionado Mint is customized and built in a unique colour and finish. With the first 1,000 pieces created using moving parts from a Hypercar Engine, no two releases will be the same. All our Custom Pieces come with an all World Access Pass. View our roadmap below to see what you will be able to do with your time piece as we build out our project.</div>" }}/>
        <Section bg={bg3} size={1} Component={TextSection} id="utility" componentProps={{header: "Utility", image: "/assets/Watch Still 02.png", emailCapture: true, openEmailModal: openEmailModal, body: "<div>As a Wrist Aficionado Watch Club (WAWC) holder, you will gain access to private collector events, dinners, and have first dibs on new pieces in our boutiques at exclusive prices before they become available to the public. Get started by <u><b><a href='https://discord.com/invite/cJpYAvJhTG' target='_blank'>joining our Discord community</a></b></u> or by signing up for our Newsletter and stay up to date with each release!</div>"}}/>
        <Section bg={bg4} size={1} Component={TextSection} id="events" componentProps={{header: "Events", header2:"Bitcoin 2022", body: "<div>Holders will have access to our VIP events in various different cities, and have the opportunity to meet with some of the worlds top collectors in the Wrist Aficionado network.</div>", body2: "Come see us at Bitcoin 2022 in Miami Beach, where we will be showcasing some of our rarest pieces, as well as announcing the mint date for WAWC. Active community members that are in Miami between the 6th-9th will be invited to our boutique located in the Setai hotel for a private tour."}}/>
        <Section bg={bg6} size={2} Component={TextSection} componentProps={{header: "Roadmap", body: "<div id='roadmap'><b>15% | March</b><br/><ul>    <li>1,000 Metaverse Hyper Car Watch</li>    <li>GIVEAWAY 3-5 Watches from our boutique to our watch club members</li>    <ul/><br/><b>25% | April</b><br/><ul>    <li>1,000 Crypto Watch</li>    <li>1,000 Solar System Watch</li>    <li>GIVEAWAY 3-5 watches from our boutique to our watch club members</li></ul><br/><b>35% | May</b><br/><ul>    <li>1,000 Formula 1 Watch for Miami F1</li>    <li>1,000 DJ Watch</li>    <li>GIVEAWAY 3-5 watches from our boutique to our watch club members</li></ul><br/><b>45% | June</b><br/><ul>    <li>1,000 Casino Watch inspired by Vegas & Macau</li>    <li>1,000 Time Machine Watch</li>    <li>GIVEAWAY 3-5 watches from our boutique to our watch club members</li></ul><br/><b>55% | July</b><br/><ul>    <li>1,000 Formula E Watch</li>    <li>1,000 Steam Power Watch</li>    <li>GIVEAWAY 3-5 watches from our boutique to our watch club members</li></ul><br/><b>75%</b>    <br/>    <ul>    <li>1,000 Piece Uniques that will be fully customizable in our studio</li>    <li>Develop AR platform to see your watch in real life</li></ul><br/><b>85%</b><br/><ul>    <li>Accessory store launch</li></ul><br/><b>100%</b><br/><ul>    <li>Build virtual Wrist Aficionado boutique where you can accessorize your watch and buy real watches from our inventory. (WA members will get early access, and exclusive prices on watch purchases).</li>  <br/>  <li>All of our members can now enter Web3 with our All World Access Pass (AWAP).</li></ul></div>"}}/>
        <Footer />
      </div>
    </Suspense>
    
  );
}

export default App;
