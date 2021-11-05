import React from 'react';
import { usePlayerCharacters, useWallet} from '../../hooks/hooks';
import SelectCharacter from '../SelectCharacter';
import '../../App.css';

const WalletButton = () => {

    const {acct, connectWallet} = useWallet();
    const { playerNFT } = usePlayerCharacters();
    return(
        <> {acct !== '' ? (
            <div><p> Wallet Connected</p><SelectCharacter />{playerNFT}</div> ):(
        
        <button
        className="cta-button connect-wallet-button"
        onClick={connectWallet}
      >
        Connect Wallet To Get Started
        </button>
        )}
        </>
    )
}

export default WalletButton;