import {
  TicketNftContractAddress,
} from "@/contracts/constant";
import TicketNftContract from "../contracts/TicketNft.sol/TicketNft.json";
import { useChainId, useReadContract } from 'wagmi';

const useSeatNumbers = () => {
  const chainId = useChainId();
  const { data: useSeatNumbers } = useReadContract({
    address: TicketNftContractAddress,
    abi: TicketNftContract.abi,
    chainId,
    functionName: 'getUsedSeatNumbers',
    args: [],
  });

  return useSeatNumbers as string | undefined;
};

export default useSeatNumbers;
