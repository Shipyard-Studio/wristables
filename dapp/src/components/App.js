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
const BigTextSection = lazy(() => import('./BigTextSection'));
const Roadmap = lazy(() => import('./Roadmap'));
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

  function typeOfSection(r) {
    if(pageWidth > 950) {
      return r ? Roadmap : BigTextSection 
    } else {
      return TextSection
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
          <ModalForm closeModal={closeModal} pageWidth={pageWidth}/>
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
        <Section bg={bg2} size={1} Component={typeOfSection()} id="about" componentProps={{header: "About", image: "/assets/Watch Still 02.png", roadmap: true, body: "<div>Every Wrist Aficionado Mint is customized and built in a unique colour and finish. With the first 1,000 pieces created using moving parts from a Hypercar Engine, no two releases will be the same. All our Custom Pieces come with an all World Access Pass. View our roadmap below to see what you will be able to do with your time piece as we build out our project.</div>" }}/>
        <Section bg={bg3} size={1} Component={typeOfSection()} id="utility" componentProps={{header: "Utility", image: "/assets/Watch Still 01.png", emailCapture: true, openEmailModal: openEmailModal, body: "<div>As a Wrist Aficionado Watch Club (WAWC) holder, you will gain access to private collector events, dinners, and have first dibs on new pieces in our boutiques at exclusive prices before they become available to the public. Get started by <u><b><a href='https://discord.com/invite/cJpYAvJhTG' target='_blank'>joining our Discord community</a></b></u> or by signing up for our Newsletter and stay up to date with each release!</div>"}}/>
        <Section bg={bg4} size={1} Component={typeOfSection()} id="events" componentProps={{header: "Events", header2:"Bitcoin 2022", body: "<div>Holders will have access to our VIP events in various different cities, and have the opportunity to meet with some of the worlds top collectors in the Wrist Aficionado network.</div>", body2: "Come see us at Bitcoin 2022 in Miami Beach, where we will be showcasing some of our rarest pieces, as well as announcing the mint date for WAWC. Active community members that are in Miami between the 6th-9th will be invited to our boutique located in the Setai hotel for a private tour."}}/>
        <Section bg={bg6} size={2} Component={typeOfSection(true)} componentProps={{header: "Roadmap", body: '<div id="roadmap"><div id="part1">    <h4>Part I</h4><br/>    <p>The first Wrist Aficionado (WA) NFT drop will be "Hyper Car" inspired. It will have a quantity of 500 NFTs with five (5) tiers (Limited, Unique, Rare, Exotic, & Ultimate). Once you buy a WA NFT, you will become a watch club member.</p><br/></div><div id="part2">            <h4>Part II</h4><br/>    <p>Once the mint is sold out, Wrist Aficionado will throw a WA- sponsored event for all watch club members. We will also give our loyal club members three (3) watches from our IRL boutiques. As the event takes place, a second watch collection will be in development.</p><br/></div><div id="part3">    <h4>Part III</h4><br/>    <p>After our WA NFT sponsored event, we will launch a watch flipping course in our private Discord for all of our club members. A $500 coupon will accompany this educational course so that all club members can buy WA Boutique items at a discounted price.</p><br/></div><div id="part4">    <h4>Part IV</h4><br/>    <p>As our community builds, we plan to give back more and grant a lucky watch club member free seats to specific MLB & NBA Games. We will also look to develop an Augmented Reality (AR) platform to see your Wrist Aficionado watch NFT IRL.</p><br/></div><div id="part5">    <h4>Part V</h4><br/>    <p>Wrist Aficionado, at this point, is looking to merge its IRL boutique selections into the metaverse. The Virtual Wrist Aficionado Boutique will be a place where buyers can inspect and purchase IRL and NFT watches within an engaging virtual experience.</p><br/></div></div>'}}/>
        <Footer />
      </div>
    </Suspense>
    
  );
}

export default App;
