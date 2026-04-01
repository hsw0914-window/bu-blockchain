const { createLocalNft } = require("../data/store");
const { buildNftMetadata } = require("../utiles/nftMetadata");

function mintNft(userId, template) {
  const minted = createLocalNft(
    userId,
    template.baseKey,
    (serial) => buildNftMetadata(template, serial),
  );

  return {
    ...minted,
    metadata: minted.metadata,
  };
}

module.exports = {
  mintNft,
};
