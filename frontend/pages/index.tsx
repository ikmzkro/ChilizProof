import { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  baseERC20ContractAddress,
  MyNFTContractAddress,
} from "../contracts/contracts";
import MyNFT from "../contracts/MyNFT.json";
import BaseERC20 from "../contracts/BaseERC20.json";
import Moralis from "moralis";
import axios from "axios";
import { players, seatList } from "@/utils/vote";
import { makeMerkleTree } from "@/utils/merkletree";

interface Window {
  ethereum: any;
}
declare var window: Window;

// Global flag to ensure Moralis is only initialized once
let moralisInitialized = false;

export default function Home() {
  const [account, setAccount] = useState("");
  const [tokenBalance, setTokenBalance] = useState("");
  const [nftOwner, setNftOwner] = useState(false);
  const [inputData, setInputData] = useState({
    selectedSeat: "",
    selectedPlayer: "",
  });
  const [items, setItems] = useState<any[]>([]);
  const chilizSpicyTestnetChainId = "0x15b32"; // 88882 in hexadecimal
  const sepoliaChainId = "11155111"; // 88882 in hexadecimal
  const zeroAddress = "0x0000000000000000000000000000000000000000";

  players.sort((a, b) => a.number - b.number);

  const initializeMoralis = async () => {
    console.log("moralisInitialized", moralisInitialized);

    if (!moralisInitialized) {
      try {
        moralisInitialized = true;
        await Moralis.start({
          apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
        });
      } catch (error) {
        console.error("Moralis initialization error:", error);
      }
    }
  };

  const checkMetaMaskInstalled = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      alert("Please install MetaMask!");
    }
  };

  // const checkChainId = async () => {
  //   const { ethereum } = window;
  //   if (ethereum) {
  //     const chain = await ethereum.request({
  //       method: "eth_chainId",
  //     });
  //     console.log(`chain: ${chain}`);

  //     if (chain != chilizSpicyTestnetChainId || chain != sepoliaChainId) {
  //       alert("Please connect to the Chiliz Spicy Testnet!");
  //       setChainId(false);
  //       return;
  //     } else {
  //       setChainId(true);
  //     }
  //   }
  // };

  // // TODO: https://github.com/ikmzkro/Chiliz-Sports-Hackathon/issues/27
  // const checkBalance = async () => {
  //   try {
  //     const response = await Moralis.EvmApi.balance.getNativeBalance({
  //       address: "0x26fcbd3afebbe28d0a8684f790c48368d21665b5",
  //       chain: "0x15b38",
  //     });

  //     console.log("getBalance is done", response.toJSON());
  //     setChilizTokenBalance(response.result.balance);
  //   } catch (error) {
  //     console.error("Failed to get balance:", error);
  //   }
  // };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(`account: ${accounts[0]}`);
      setAccount(accounts[0]);

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
    } catch (err) {
      console.log(err);
    }
  };

  const checkAccountChanged = () => {
    setAccount("");
    setNftOwner(false);
    setItems([]);
    setTokenBalance("");
    setInputData({
      selectedSeat: "",
      selectedPlayer: "",
    });
  };

  const checkNft = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(
      MyNFTContractAddress,
      MyNFT.abi,
      signer
    );

    // loginUserAddress: Test address for checking NFTs on the frontend.
    const ownerAddress = "0x0486b1770B1cCe0f4E84E95274b9D46a9dE68c26";

    // To retrieve the Token IDs of NFTs owned by ownerAddress
    // tokenOfOwnerByIndex
    // const tokenId = await nftContract.tokenOfOwnerByIndex(addr, i);
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      chain: sepoliaChainId,
      address: ownerAddress,
    });
    const nfts = response.raw.result;
    const numberOfNFTs = response.raw.result.length;
    console.log("response.raw.result", response.raw.result);

    const filteredNFTs = response.result.filter(
      (nft) =>
        nft.tokenAddress._value.toLowerCase() ===
        MyNFTContractAddress.toLowerCase()
    );
    const tokenIds = filteredNFTs
      .map((nft) => nft.tokenId)
      .sort((a, b) => a - b);

    if (numberOfNFTs > 0) {
      setNftOwner(true);

      for (let i = 0; i < numberOfNFTs; i++) {
        try {
          const meta = await axios.get(nfts[i].token_uri as any);
          const name = meta.data.name;
          const description = meta.data.description;
          const imageURI = meta.data.image;
          console.log("imageURI", imageURI);

          const item = {
            tokenId: tokenIds[i],
            name,
            description,
            tokenURI: nfts[i].token_uri,
            imageURI,
          };

          // Check if tokenId already exists in nfts array before adding
          const existingIndex = items.findIndex(
            (nft) => nft.tokenId === tokenIds[i]
          );
          if (existingIndex === -1) {
            items.push(item); // Add the new NFT item to the array
          } else {
            // Update existing item if needed
            items[existingIndex] = item;
          }
        } catch (error) {
          console.error(
            `Error fetching metadata for tokenId ${tokenIds[i]}:`,
            error
          );
        }
      }
    } else {
      console.log("No NFTs owned.");
    }
  };

  // const tokenTransfer = async (event: any) => {
  //   event.preventDefault();
  //   if (
  //     tokenBalance >= inputData.transferAmount &&
  //     zeroAddress != inputData.transferAddress
  //   ) {
  //     try {
  //       const { ethereum } = window;
  //       const provider = new ethers.providers.Web3Provider(ethereum);
  //       const signer = provider.getSigner();
  //       const erc20Contract = new ethers.Contract(
  //         baseERC20ContractAddress,
  //         BaseERC20.abi,
  //         signer
  //       );
  //       const tx = await erc20Contract.transfer(
  //         inputData.transferAddress,
  //         inputData.transferAmount
  //       );
  //       await tx.wait();

  //       const tBalance = await erc20Contract.balanceOf(account);
  //       setTokenBalance(tBalance.toNumber());
  //       setInputData((prevData) => ({
  //         ...prevData,
  //         transferAddress: "",
  //         transferAmount: "",
  //       }));
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   } else {
  //     alert(
  //       "You cannot specify tokens exceeding the account balance or send them to the zero address."
  //     );
  //   }
  // };

  const handleSeatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputData({ ...inputData, selectedSeat: e.target.value });
  };

  const handlePlayerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputData({ ...inputData, selectedPlayer: e.target.value });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputData.selectedSeat && inputData.selectedPlayer) {
      // Obtain the Merkle root and Merkle proof
      const makeMerkleTreeRes = await makeMerkleTree(
        account,
        inputData.selectedSeat,
        inputData.selectedPlayer
      );

      // After calculation, the administrator needs to register the Merkle root in the contract
      // Selected Seat: E-119, Selected Player: 10
      console.log("makeMerkleTreeRes", makeMerkleTreeRes);
      alert("Your selection has been notified to the administrator.");
    } else {
      alert("Please select both a seat and a player.");
    }
  };

  useEffect(() => {
    initializeMoralis();
    checkMetaMaskInstalled();
    // checkChainId();
    // checkBalance();
    checkNft();
  }, []);

  return (
    <div
      className={
        "flex flex-col items-center bg-slate-100 text-blue-900 min-h-screen"
      }
    >
      <h2 className={"text-6xl font-bold my-12 mt-8"}>ChilizProof</h2>
      <div className={"flex mt-1"}>
        {account === "" ? (
          <button
            className={
              "bg-transparent text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded hover:border-transparent hover:text-white hover:bg-blue-500 hover:cursor-pointer"
            }
            onClick={connectWallet}
          >
            Connect to MetaMask
          </button>
        ) : (
          <div>
            <p className="px-2 py-2"> Check login address and balance</p>
            <div className="px-2 py-2 mb-2 bg-white border border-gray-400">
              <span className="flex flex-col items-left font-semibold">
                WalletAddress: {account}
              </span>
              {/* <span className="flex flex-col items-left font-semibold">
                ChilizFanTokenBalance: {tokenBalance}
              </span> */}
            </div>
            <p className="px-2 py-2 mt-8">Vote to receive FanToken</p>
            <div>
              <form className="flex pl-1 py-1 mb-1 bg-white border border-gray-400">
                <select
                  className="w-5/12 ml-2 text-right border border-gray-400"
                  name="selectedSeat"
                  onChange={handleSeatChange}
                  value={inputData.selectedSeat}
                >
                  <option value="" disabled>
                    Please select a seat
                  </option>
                  {seatList.map((seat) => (
                    <option key={seat} value={seat}>
                      {seat}
                    </option>
                  ))}
                </select>
                <select
                  className="w-6/12 ml-2 text-right border border-gray-400"
                  name="selectedPlayer"
                  onChange={handlePlayerChange}
                  value={inputData.selectedPlayer}
                >
                  {" "}
                  c980
                  <option value="" disabled>
                    Please select a player
                  </option>
                  {players.map((player) => (
                    <option key={player.number} value={player.number}>
                      {player.number} - {player.name}
                    </option>
                  ))}
                </select>
                <button
                  className="w-2/12 ml-2 mr-2 bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
            <p className="px-2 py-2 mt-8">
              View the acquired Proof of Contribution NFT
            </p>
            {nftOwner ? (
              <>
                {items.map((item: any, i: any) => (
                  <div key={i} className="flex justify-center pl-1 py-2 mb-1">
                    <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
                      <img
                        className="w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                        src={item.imageURI}
                        alt=""
                        width="200"
                        height="200"
                      />
                      <div className="p-6 flex flex-col justify-start">
                        <h5 className="text-gray-900 text-xl font-medium mb-2">
                          {item.name}
                        </h5>
                        <p className="text-gray-700 text-base mb-4">
                          {item.description}
                        </p>
                        <p className="text-gray-600 text-xs">
                          tokenId: {Number(item.tokenId)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
