const CONTRACT_ADDRESS = '0x8329E17E69429a79c68e2c9c53B855e9932FD3b0';



const transformCharacterData = (charData) => {
    return {
        name: charData.name,
        imgURI: charData.imgURI,
        hp: charData.hp.toNumber(),
        maxHp: charData.maxHp.toNumber(),
        attackDamage: charData.attackDamage.toNumber(),
        defense: charData.defense.toNumber(),
    }
}


export { CONTRACT_ADDRESS, transformCharacterData };