import { ethers } from 'ethers';
import { useState, useEffect, useContext, useCallback} from 'react';
import { CONTRACT_ADDRESS, transformCharacterData } from '../utils/constants';
import { EthWallet } from '../utils/walletContext';
import epicGame from '../utils/epicGame.json';


const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = web3Provider.getSigner(); 

export const gameContract =()=> 
   new ethers.Contract(CONTRACT_ADDRESS, epicGame.abi, signer);


export const useDefaultCharacters = () => {
    const [ characters, setCharacters] = useState([]);
    const [ contract, setContract ] = useState(null);
    const [ mintedCharacter, setMintedCharacters] = useState([])
    const { acct, minting, setMinting } = useWallet();

    const mintCharacter = useCallback(async(characterId) =>{
        try{
            if(contract){
                setMinting(true);
                const mintTrxn = await gameContract().mintCharacterNFT(characterId);
                await mintTrxn.wait();
                setMinting(false);
                console.log('mintTrxn:', mintTrxn);
            }
        } catch (error){
            console.warn("Mint Character Error:", error);
        }
    }, [setMinting]);
 
    useEffect(() => {
      setContract(gameContract);
      const getDefaultCharacters = async () => {
        try {
          const characterTrxn = await gameContract().getAllDefaultChars();

          const chars = characterTrxn.map((characterData, i) =>
            transformCharacterData(characterData, i)
          );
        //   console.log("characters", chars);
          setCharacters(chars);
        } catch (error) {
          console.log(error);
        }
      };

      const onmintCharacter = async (sender, tokenId, characterIndex) => {
        console.log(
            `CharacterNFTMinted - sender: ${sender} tokenId: ${tokenId.toNumber()} characterIndex: ${characterIndex.toNumber()}`
          );
      
      };

      if (contract) {
        getDefaultCharacters();
        gameContract().on(onmintCharacter);
      }

      return () => {
        if (contract) {
          gameContract().off(onmintCharacter);
        }
      };
    }, [acct, contract]);

    return { characters, mintCharacter, minting }
};


export const usePlayerCharacters = () =>{
    const [ playerNFT, setPlayerNFT] = useState([]);
    const { acct } = useWallet();

    useEffect(async()=>{
        const fetchNFTMeta = async()=>{
        const trxn = await gameContract().checkIfUserHasToken();
        if(trxn.name) {
            setPlayerNFT(transformCharacterData(trxn));
        } else {
            console.log('No character found');
        }
        }

        if(acct){
            console.log('acct:', acct);
            fetchNFTMeta();
        }
    }, [acct])

    return {playerNFT};
}
// wallet Hook to context provider
export const useWallet = () =>{
    return useContext(EthWallet);
}