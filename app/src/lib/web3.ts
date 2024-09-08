import {connectorsForWallets} from "@rainbow-me/rainbowkit";
import {
  coinbaseWallet,
  ledgerWallet,
  metaMaskWallet,
  rainbowWallet,
  safeWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import _ from "lodash";
import {Chain, http} from "viem";
import {arbitrum, base, mainnet, optimism, polygon, sepolia, spicy} from "viem/chains";
import {createConfig, createStorage} from "wagmi";

import {chainsList} from "./chains";

const ALCHEMY_ID = process.env.NEXT_PUBLIC_ALCHEMY_ID;

export const chainsMap = (chainId?: number) =>
  chainId
    ? chainsList[chainId as number]
    : (_.first(_.values(chainsList)) as Chain);

export const explorerUrl = (chainId?: number) =>
  chainId &&
  _.get(
    chainsMap(chainId),
    "blockExplorers.etherscan.url",
    _.get(chainsMap(chainId), "blockExplorers.default.url")
  );

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [
        rainbowWallet,
        walletConnectWallet,
        coinbaseWallet,
        metaMaskWallet,
        ledgerWallet,
        safeWallet,
      ],
    },
  ],
  {
    appName: "chilizproof",
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "",
  }
);

const noopStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

// uses a fallback value noopStorage (saw this example in the wagmi docs) if not on the client
// this is resolved in wagmi v2 with the "ssr" option in createConfig
const storage = createStorage({
  storage:
    typeof window !== "undefined" && window.localStorage
      ? window.localStorage
      : noopStorage,
});

export const RPC_URLS = {
  [mainnet.id]: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_ID}`,
  [optimism.id]: `https://opt-mainnet.g.alchemy.com/v2/${ALCHEMY_ID}`,
  [polygon.id]: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_ID}`,
  [base.id]: `https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_ID}`,
  [arbitrum.id]: `https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_ID}`,
  // [sepolia.id]: `https://gateway-api.cabinet-node.com/${CABINET_ACCESS_TOKEN}`,
  [sepolia.id]: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_ID}`,
  [spicy.id]: `https://spicy-rpc.chiliz.com`,
};

export const wagmiConfig = createConfig({
  connectors,
  chains: [sepolia, mainnet, optimism, base, arbitrum, polygon, spicy],
  storage,
  ssr: true, // If your dApp uses server side rendering (SSR)
  transports: {
    [mainnet.id]: http(RPC_URLS[mainnet.id]),
    [optimism.id]: http(RPC_URLS[optimism.id]),
    [polygon.id]: http(RPC_URLS[polygon.id]),
    [base.id]: http(RPC_URLS[base.id]),
    [arbitrum.id]: http(RPC_URLS[arbitrum.id]),
    [sepolia.id]: http(RPC_URLS[sepolia.id]),
    [spicy.id]: http(RPC_URLS[spicy.id]),
  },
});
