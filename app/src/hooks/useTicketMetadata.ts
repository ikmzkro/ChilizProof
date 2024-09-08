import { useState, useEffect } from "react";
import { TicketNftContractAddress } from "@/contracts/constant";
import TicketNftContract from "../contracts/TicketNft.sol/TicketNft.json";
import { useAccount, useReadContract } from 'wagmi';
import axios from "axios";

const useTicketMetadata = () => {
  const account = useAccount();
  const [metadata, setMetadata] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the contract using useReadContract hook
  const { data: nftData, isError, isLoading } = useReadContract({
    address: TicketNftContractAddress,
    abi: TicketNftContract.abi,
    chainId: account.chainId,
    functionName: "getTicketMetadata",
    args: [account.address],
  });

  const nftdata: any = nftData

  useEffect(() => {
    const fetchMetadata = async () => {
      if (!nftData || !nftdata[1]) {
        console.log("nftdata is not available:", nftdata);
        return; // Handle case where nftdata or URL is not present
      }

      try {
        setLoading(true);
        const response = await axios.get(nftdata[1]); // Fetch the metadata from the URL
        setMetadata(response.data);
      } catch (err) {
        setError("Failed to fetch metadata");
        console.error('Error fetching metadata:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [nftdata]);

  return {
    metadata,
    nftdata,
    loading: isLoading || loading,
    error: isError || error,
  };
};

export default useTicketMetadata;
