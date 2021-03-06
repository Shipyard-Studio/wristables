import React, {useEffect, useState, lazy, Suspense} from 'react';
import Modal from 'react-modal';
import ModalChainID from './ModalChainId'
import Section from './Section';
import ProgressBar from './ProgressBar';
import Hero from './Hero';
import '../style/App.css';
import getModalStyle from '../helpers/modalStyles';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers"
import WAWCJSON from '../utils/WAWC.json'

const Sidebar = lazy(() => import('./Sidebar'));
const ModalForm = lazy(() => import('./ModalForm'));
const EmailModalForm = lazy(() => import('./EmailModalForm'));
const TextSection = lazy(() => import('./TextSection'));
const BigTextSection = lazy(() => import('./BigTextSection'));
const Roadmap = lazy(() => import('./Roadmap'));
const Footer = lazy(() => import('./Footer'));



function App() {

  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "f05672c8380c4c19a16397fb827b33cd" // required
      }
    }
  };

  const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions // required
  });

  const WAWCAddr = '0x219b2276A95DeD887d1281c0841Af4161C4bb415'
  const desiredChain = 1
  const desiredHexChain = '0x1'

  const bg1 = '/optimized/1.jpg'
  const bg2 = '/optimized/2.jpg'
  const bg3 = '/optimized/3.jpg'
  const bg4 = '/optimized/4.jpg'
  const bg5 = '/optimized/5.jpg'
  const bg6 ='./optimized/6.jpg'

  Modal.setAppElement('#root');

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

  const [contract, setContract] = useState(undefined)
  const [signer, setSigner] = useState(undefined)
  const [instance, setInstance] = useState(undefined)
  const [provider, setProvider] = useState(undefined)
  const [walletAddress, setWallet] = useState("")
  const [chainId, setChainId] = useState("")
  const [sectionInFocus, setSectionInFocus] = useState(0)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [emailModalIsOpen, setIsEmailModalOpen] = useState(false)
  const [chainModalIsOpen, setChainModalIsOpen] = useState(false)
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

  function openChainModal() {
    setChainModalIsOpen(true);
  }

  function closeChainModal() {
    setChainModalIsOpen(false);
  }

  async function walletConnect () {
      const instance = await web3Modal.connect()
      setInstance(instance)
      const p = new ethers.providers.Web3Provider(instance);
      await p.ready;
      setProvider(p)
      const s = p.getSigner();
      setSigner(s)
      const c = new ethers.Contract(WAWCAddr, WAWCJSON.abi, p);
      setContract(c)
      const accounts = await p.listAccounts();
      if (accounts) setWallet(accounts[0])
      await checkChain(p)
  }

  async function checkChain(provider) {
    const network = await provider.getNetwork()
    setChainId(network.chainId)
    if (chainId !== desiredChain) {
      openChainModal()
    } else {
      closeChainModal()
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
      window.ethereum.on('chainChanged', (chain) => {
        if(chain === desiredHexChain) {
          chain = desiredChain
        }
        setChainId(chain)
        if (chainId !== desiredChain) {
          openChainModal()
        } else {
          closeChainModal()
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
          <EmailModalForm closeModal={closeEmailModal} pageWidth={pageWidth}/>
      </Modal>
      <Modal
        
        isOpen={chainModalIsOpen}
        onAfterOpen={afterOpenModal}
        style={modalStyles}
        contentLabel="Example Modal"
      >
        <ModalChainID chainId={chainId} instance={instance} provider={provider} closeModal={closeChainModal}/>
    </Modal>

        {pageWidth < 950 ? <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} /> : <></> }
        {/* <ProgressBar num={sectionInFocus}/> */}
        <Section bg={null} size={1} Component={Hero} id="home" componentProps={{ethers: ethers, provider: provider, signer: signer, contract: contract, walletAddress: walletAddress, connect: walletConnect, openModal: openModal, chainId: chainId, pageWidth: pageWidth}}/>
        <Section bg={bg2} size={1} Component={typeOfSection()} id="about" componentProps={{header: "About", image: "/assets/Watch Still 02.png", video: true, roadmap: true, body: "<div>Backed by over 30 years of rich industry experience, Wrist Aficionado blends Madison-Avenue polish with the tech-forward world of NFTs and web3. The goal of matching your wrist to the ideal watch - in the metaverse and beyond - that???s what drives us.</div>" }}/>
        <Section bg={bg3} size={1} Component={typeOfSection()} id="utility" componentProps={{header: "Utility", image: "/assets/Watch Still 01.png", emailCapture: true, openEmailModal: openEmailModal, body: "<div>Wrist Aficionado Watch Club members comprise an elite group, with access to a host of private events, presale watch releases, and fractional group-buys that minimize risk and enable larger investments. Holders will own IP rights to their watch and acquire 3D files of each. These dynamic watches will be wearable in the metaverse. Experience exclusive Discords with members-only daily drops, invaluable buying & selling tips and much more. Utility grows with the purchase of each additional watch. Owners of 1 to 5 watches are automatically whitelisted. Should holders acquire more than 10 watches, minting on the next project will be entirely free.</div>"}}/>
        <Section bg={bg4} size={1} Component={typeOfSection()} id="vision" componentProps={{header: "Vision", header2:"Team", body: '<div>Imbued with a spirit of delirious ambition, WAWC is the future of timekeeping accessories. We envision Wrist Aficionado Watch Club as the premier wearable luxury brand in the fledgling Metaverse. Brands are only beginning to enter the Metaverse through NFTs, leaving ample white space in the market - especially where luxury accessories are concerned. Distinguished by our expert team and nimble roadmap, WAWC is primed to adapt to this nascent industry. Wrist Aficionado aims to provide a powerful investment, through which holders gain immense value and discover community.</div>', body2: `<div><div>Spearheaded by our founders, Eddie , Vadim  and Mike, Wrist Aficionado is composed of upcoming digital artists, web3 degens and community builders.</div></div><br/><div class="team-pfp"><img src="/Eddie.png" alt="eddie" /></div><b>Founder | Eddie</b><br/><div>Eddie holds over 15 years of experience in the watch industry. His ultimate ambition is to migrate the luxury watch boutique experience to the Metaverse, and establish Wrist Aficionado as the Metaverse???s premier watchmaker. </div><br/><br/><div class="team-pfp"><img src="/Vadim.png" alt="vadim" /></div><b>Founder | Vadim</b><br/><div>A 25-year watch industry veteran, Vadim shrewdly predicted that the future of the luxury market rested in web3. After beginning his career with Jacob & Co, he launched Wrist Aficionado in 2017, quickly opening up two brick-and-mortar stores in NYC and Miami, alongside Eddie. </div><br/<br/><div class="team-pfp"><img src="/Mike.png" alt="mike" /></div><b>Founder | Mike</b><br/><div>Mike???s captivation with watches stretches back three decades. A serial entrepreneur from a young age, he has conceived and sold multiple million-dollar businesses. In 2017, Mike began a client-business relationship with Wrist Aficionado. After gaining an appreciation for their honesty and professionalism, he became a company partner in 2020. </div><br/<br/><div class="team-pfp"><img src="/J Digital.png" alt="J Digital" /></div><b>Artist | J. Digital</b><br/><div>J. Digital is an award-winning artist with over 25 years of creative exploration in primetime network campaigns, movies, and national commercials. His work is characterized by boundary-pushing artistry, with a roster of previous clients that includes the Emmy Awards, Lord of the Rings game, Warner Bros., Sega, Toshiba, Red Bull, Monster, Fox Sports, Ford, Toyota, Discovery Network and Mattel. </div><br/<br/><div class="flex"><div class="team-pfp"><img src="/Shipyard1.png" alt="Macro Team" /></div><div class="team-pfp"><img src="/Shipyard2.png" alt="Macro Team" /></div><div class="team-pfp"><img src="/Shipyard3.png" alt="Macro Team" /></div></div><b>Development Team</b><br/><div>Our expert development team works for Shipyard, an advanced fellowship program for training in solidity and web3, backed by some of the best founders, operators and investors in web3.</div></div>`,}}/>
        <Section bg={bg6} size={2} Component={typeOfSection(true)} componentProps={{header: "Roadmap", body: '<div id="roadmap"><div id="part1">    <h4>Part I</h4><br/>    <p>The first Wrist Aficionado (WA) NFT drop will be "Hyper Car" inspired. It will have a quantity of 500 NFTs with five (5) tiers (Limited, Unique, Rare, Exotic, & Ultimate). Once you buy a WA NFT, you will become a watch club member. All holders will also get WL on future watch drops.</p><br/></div><div id="part2">            <h4>Part II</h4><br/>    <p>Once the mint is sold out, Wrist Aficionado will throw a WA- sponsored event for all watch club members. We will also give our loyal club members three (3) watches from our IRL boutiques. As the event takes place, a second watch collection will be in development.</p><br/></div><div id="part3">    <h4>Part III</h4><br/>    <p>After our WA NFT sponsored event, we will launch a watch flipping course in our private Discord for all of our club members. A $500 coupon will accompany this educational course so that all club members can buy WA Boutique items at a discounted price.</p><br/></div><div id="part4">    <h4>Part IV</h4><br/>    <p>As our community builds, we plan to give back more and grant a lucky watch club member free seats to specific MLB & NBA Games. We will also look to develop an Augmented Reality (AR) platform to see your Wrist Aficionado watch NFT IRL.</p><br/></div><div id="part5">    <h4>Part V</h4><br/>    <p>Wrist Aficionado, at this point, is looking to merge its IRL boutique selections into the metaverse. The Virtual Wrist Aficionado Boutique will be a place where buyers can inspect and purchase IRL and NFT watches within an engaging virtual experience.</p><br/></div></div>'}}/>
        <Footer />
      </div>
    </Suspense>
    
  );
}

export default App;
