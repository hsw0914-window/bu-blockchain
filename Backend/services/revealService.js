function revealFragmentResult(fragment, amount) {
  return {
    type: "fragment",
    name: fragment.name,
    rarity: fragment.rarity,
    image: fragment.image,
    amount,
    description: `${fragment.rarity} 등급의 밈 파편 ${amount}개를 획득했습니다!`,
  };
}

function revealMintedNftResult(mintedNft) {
  return {
    type: "nft",
    name: mintedNft.metadata.name,
    rarity: mintedNft.metadata.rarity,
    image: mintedNft.metadata.image,
    description: `${mintedNft.metadata.rarity} 등급의 완성된 NFT를 획득했습니다!`,
    metadata: mintedNft.metadata,
  };
}

function revealCombinedNftResult(mintedNft, upgraded) {
  return {
    name: mintedNft.metadata.name,
    rarity: mintedNft.metadata.rarity,
    image: mintedNft.metadata.image,
    upgraded,
    description: upgraded
      ? "동일 희귀도 파편 3개 조합으로 상위 등급 NFT가 생성되었습니다."
      : "서로 다른 파편 조합 결과로 랜덤 NFT가 생성되었습니다.",
    metadata: mintedNft.metadata,
  };
}

module.exports = {
  revealFragmentResult,
  revealMintedNftResult,
  revealCombinedNftResult,
};
