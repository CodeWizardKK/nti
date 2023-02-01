// Setup: npm install alchemy-sdk
import { Network, Alchemy } from 'alchemy-sdk';

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: "5go2eKfHJofdLEFdONmkBpiz_XsSwN7O", // Replace with your Alchemy API Key.
  network: Network.ETH_GOERLI, // Replace with your network.
};

export const alchemy = new Alchemy(settings);
