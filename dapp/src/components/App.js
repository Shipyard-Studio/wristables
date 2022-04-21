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
        <Section bg={bg2} size={1} Component={typeOfSection()} id="about" componentProps={{header: "About", image: "/assets/Watch Still 02.png", roadmap: true, body: "<div>Backed by over 30 years of rich industry experience, Wrist Aficionado blends Madison-Avenue polish with the tech-forward world of NFTs and web3. The goal of matching your wrist to the ideal watch - in the metaverse and beyond - that’s what drives us. Propelled by an unsurpassed commitment to our customers, we provide you with an NFT accessory that combines real-world utility, longevity and IP rights value - the <i>very first</i> luxury watch in the metaverse to do so. </div>" }}/>
        <Section bg={bg3} size={1} Component={typeOfSection()} id="utility" componentProps={{header: "Utility", image: "/assets/Watch Still 01.png", emailCapture: true, openEmailModal: openEmailModal, body: "<div>Wrist Aficionado Watch Club members comprise an elite group, with access to a host of private events, presale watch releases, and fractional group-buys that minimize risk and enable larger investments. Holders will own IP rights to their watch and acquire 3D files of each. These dynamic watches will be wearable in the metaverse. Experience exclusive Discords with members-only daily drops, invaluable buying & selling tips and much more. Utility grows with the purchase of each additional watch. Owners of 1 to 5 watches are automatically whitelisted. Should holders acquire more than 10 watches, minting on the next project will be entirely free.</div>"}}/>
        <Section bg={bg4} size={1} Component={typeOfSection()} id="vision" componentProps={{header: "Vision", header2:"Team", body: "<div>Imbued with a spirit of delirious ambition, WAWC is the future of timekeeping accessories. We envision Wrist Aficionado Watch Club as the premier wearable luxury brand in the fledgling Metaverse. Brands are only beginning to enter the Metaverse through NFTs, leaving ample white space in the market - especially where luxury accessories are concerned. Distinguished by our expert team and nimble roadmap, WAWC is primed to adapt to this nascent industry. Wrist Aficionado aims to provide a powerful investment, through which holders gain immense value and discover community.</div>", body2: "<div>Spearheaded by our founders, Eddie , Vadim  and Mike, Wrist Aficionado is composed of upcoming digital artists, web3 degens and community builders.</div>"}}/>
        <Section bg={bg6} size={2} Component={typeOfSection(true)} componentProps={{header: "Roadmap", body: '<div id="roadmap"><div id="part1">    <h4>Part I</h4><br/>    <p>The first Wrist Aficionado (WA) NFT drop will be "Hyper Car" inspired. It will have a quantity of 500 NFTs with five (5) tiers (Limited, Unique, Rare, Exotic, & Ultimate). Once you buy a WA NFT, you will become a watch club member.</p><br/></div><div id="part2">            <h4>Part II</h4><br/>    <p>Once the mint is sold out, Wrist Aficionado will throw a WA- sponsored event for all watch club members. We will also give our loyal club members three (3) watches from our IRL boutiques. As the event takes place, a second watch collection will be in development.</p><br/></div><div id="part3">    <h4>Part III</h4><br/>    <p>After our WA NFT sponsored event, we will launch a watch flipping course in our private Discord for all of our club members. A $500 coupon will accompany this educational course so that all club members can buy WA Boutique items at a discounted price.</p><br/></div><div id="part4">    <h4>Part IV</h4><br/>    <p>As our community builds, we plan to give back more and grant a lucky watch club member free seats to specific MLB & NBA Games. We will also look to develop an Augmented Reality (AR) platform to see your Wrist Aficionado watch NFT IRL.</p><br/></div><div id="part5">    <h4>Part V</h4><br/>    <p>Wrist Aficionado, at this point, is looking to merge its IRL boutique selections into the metaverse. The Virtual Wrist Aficionado Boutique will be a place where buyers can inspect and purchase IRL and NFT watches within an engaging virtual experience.</p><br/></div></div>'}}/>
        <Footer />
      </div>
    </Suspense>
    
  );
}

export default App;
