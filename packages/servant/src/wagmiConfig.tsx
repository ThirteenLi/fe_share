import { defineChain } from "viem";
import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

export const capell_test = /*#__PURE__*/ defineChain({
  id: 1668312164,
  name: "Capell Test",
  nativeCurrency: { name: "Capell Test Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["http://47.236.122.193:9228"],
    },
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://sepolia.etherscan.io",
      apiUrl: "https://api-sepolia.etherscan.io/api",
    },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 751532,
    },
    ensRegistry: { address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e" },
    ensUniversalResolver: {
      address: "0xc8Af999e38273D658BE1b921b88A9Ddf005769cC",
      blockCreated: 5_317_080,
    },
  },
  testnet: true,
});

export const config = createConfig({
  chains: [mainnet, sepolia, capell_test],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http("https://endpoints.omniatech.io/v1/eth/sepolia/public"),
    [capell_test.id]: http(),
  },
});
