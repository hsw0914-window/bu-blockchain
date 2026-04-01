function extractBaseName(name) {
  return name.includes("#") ? name.split("#")[0].trim() : name;
}

function buildNftMetadata(template, serial) {
  return {
    name: `${extractBaseName(template.name)} #${serial}`,
    rarity: template.rarity,
    image: template.image,
    description: `${template.rarity} 등급의 밈 NFT입니다.`,
  };
}

module.exports = {
  buildNftMetadata,
};
