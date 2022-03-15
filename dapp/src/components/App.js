import React, {useEffect, useState} from 'react';
import Sidebar from './Sidebar';
import Modal from 'react-modal';
import ModalForm from './ModalForm';
import ModalChainID from './ModalChainId'
import Section from './Section';
import TextSection from './TextSection';
import ProgressBar from './ProgressBar';
import Hero from './Hero';
import Footer from './Footer';
import { ethers } from "ethers"
import WAWCJSON from '../utils/WAWC.json'
import '../style/App.css';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";



function App() {


const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "INFURA_ID" // required
    }
  }
};

const web3Modal = new Web3Modal({
  network: "rinkeby", // optional
  cacheProvider: true, // optional
  providerOptions // required
});

  const WAWCAddr = '0xf7DE696145B527C004669Fb07B66591e2dD53E58'
  const desiredChain = 4
  const desiredHexChain = '0x4'

  const bg1 = '/WASiteAssets/bg1.png'
  const bg2 = '/WASiteAssets/bg2.png'
  const bg3 = '/WASiteAssets/bg3.png'
  const bg4 = '/WASiteAssets/bg4.png'
  const bg5 = '/WASiteAssets/bg5.png'
  const bg6 ='./WASiteAssets/bg6.png'

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

  const [contract, setContract] = useState(undefined)
  const [signer, setSigner] = useState(undefined)
  const [provider, setProvider] = useState(undefined)
  const [walletAddress, setWallet] = useState("")
  const [chainId, setChainId] = useState("")
  const [sectionInFocus, setSectionInFocus] = useState(0)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [chainModalIsOpen, setChainModalIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  function openChainModal() {
    setChainModalIsOpen(true);
  }

  function closeChainModal() {
    setChainModalIsOpen(false);
  }

  async function walletConnect () {
      const instance = await web3Modal.connect()
        const p = new ethers.providers.Web3Provider(instance);
        await p.ready;
        setProvider(p)
        const s = p.getSigner();
        setSigner(s)
        
        const c = new ethers.Contract(WAWCAddr, WAWCJSON.abi, p);
        setContract(c)

        const addressArray = await p.send("eth_requestAccounts", [])
        setWallet(addressArray[0])

        checkChain(p)
  }

  function checkChain(provider) {
    console.log(provider)
        setChainId(provider._network.chainId)
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

  function getInFocusSection() {
    let screenHeight = window.innerHeight;
    let section = Math.round(window.scrollY / screenHeight)
    if (section !== sectionInFocus || section === 0) setSectionInFocus(section)
  }
  
  useEffect(() => {
    // getCurrentWalletConnected();
    addWalletListener(); 
    window.addEventListener("scroll", getInFocusSection)
  }, []); 


  return (
    
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

        <Modal
        
        isOpen={chainModalIsOpen}
        onAfterOpen={afterOpenModal}
        style={modalStyles}
        contentLabel="Example Modal"
      >
        <ModalChainID chainId={chainId} closeModal={closeChainModal}/>
    </Modal>


        {window.innerWidth < 900 ? <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} /> : <></> }
        <ProgressBar num={sectionInFocus}/>
        <Section bg={null} size={1} Component={Hero} componentProps={{ethers: ethers, provider: provider, signer: signer, contract: contract, walletAddress: walletAddress, connect: walletConnect, openModal: openModal, chainId: chainId}}/>
        <Section bg={bg2} size={1} Component={TextSection} componentProps={{header: "About", body: "<div>Every Wrist Aficionado Mint is customized and built in a unique colour and finish. With the first 1,000 pieces created using moving parts from a Hypercar Engine, no two releases will be the same. All our Custom Pieces come with an all World Access Pass. View our roadmap below to see what you will be able to do with your time piece as we build out our project.</div>" }}/>
        <Section bg={bg3} size={1} Component={TextSection} componentProps={{header: "Community", body: "<div>Our members become a part of a community of watch collectors and enthusiasts that can hold onto their time piece as it appreciates, or trade it and pass along the benefits to another collector. Join our Discord to be apart of our community.</div>", emailCapture: true}}/>
        <Section bg={bg4} size={1} Component={TextSection} componentProps={{header: "Events", body: "<div>Early members will have VIP access to the Wrist Aficionado Convention in Miami on April 7th, with a chance to win a one off Piece Unique that you will customize in person at the convention. Several members will also have the opportunity to win private dinners in New York City or Miami with the members of Wrist Aficionado.</div>"}}/>
        <Section bg={bg5} size={1} Component={TextSection} componentProps={{header: "Membership", body: "<div>Your membership will give you first dibs at purchasing any new releases from Wrist Aficionado before we make them available to the general public. Along with access to private VIP events that can only be accessed with wallet verification.</div>"}}/>
        <Section bg={bg6} size={2} Component={TextSection} componentProps={{header: "Roadmap", body: "<div><b>15% | March</b><br/><ul><li>1,000 Metaverse Hyper Car Watch</li><li>1,000 Crypto Watch</li><li>GIVEAWAY 3-5 watches from our boutique to our watch club members</li><ul/><br/><b>25% | April</b><br/><ul><li>1,000 Solar System watch</li><li>1,000 Steam Power Watch</li><li>GIVEAWAY 3-5 watches from our boutique to our watch club members</li></ul><br/><b>35% | May</b><br/><ul><li>1,000 Custom Formula 1 watch for Miami F1</li><li>1,000 DJ Watch</li><li>GIVEAWAY 3-5 watches from our boutique to our watch club members</li></ul><br/><b>45% | June</b><br/><ul><li>1,000 Casino Watch inspired by Vegas & Macau</li><li>1,000 Time Machine Watch</li><li>GIVEAWAY 3-5 watches from our boutique to our watch club members</li></ul><br/><b>55% | July</b><br/><ul><li>1,000 Formula E Watch</li><li>1,000 Piece Uniques that will be fully customizable in our studio</li><li>GIVEAWAY 3-5 watches from our boutique to our watch club members</li></ul><br/><b>75%</b><br/><ul><li>Develop AR platform to see your watch in real life</li></ul><br/><b>85%</b><br/><ul><li>Accessory store launch</li></ul><br/><b>100%</b><br/><ul><li>Build virtual Wrist Aficionado boutique where you can accessorize your watch and buy real watches from our inventory. (WA members will get early access, and exclusive prices on watch purchases).</li><li>All of our members can now enter the Metaverse with our All World Access Pass.</li></ul></div>"}}/>
        <Footer />
      </div>
    
  );
}

export default App;