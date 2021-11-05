import React, { useEffect, useState } from 'react';
import { useDefaultCharacters } from '../../hooks/hooks';
import './SelectCharacter.css';
import '../../App.css';
/*
 * Don't worry about setCharacterNFT just yet, we will talk about it soon!
 */
const SelectCharacter = () => {
    const { characters, mintCharacter, minting } = useDefaultCharacters();
        // console.log(characters);


    const renderCharacters = ()=>
        characters.map((character, i)=>(
                <div className="character-item" key={i}>
                  <div className="name-container">
                    <p>{character.name}</p>
                  </div>
                  <img src={character.imgURI} alt={character.name} />
                  <button
                    type="button"
                    className="character-mint-button"
                    onClick={mintCharacter(i)}
                  >{minting ? 'Minting character...' :`Mint ${character.name}`}</button>
                </div>
        ));


  return (
    <div className="select-character-container">
      <h2>Mint Your Hero. Choose wisely.</h2>
      {characters.length > 0 && (
      <div className="character-grid">{renderCharacters()}</div>
     )} 
    </div>
  );
};

export default SelectCharacter;
