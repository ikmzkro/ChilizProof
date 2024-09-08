import {
  TicketNftContractAddress,
} from "@/contracts/constant";
import TicketNftContract from "../contracts/TicketNft.sol/TicketNft.json";
import { useChainId, useReadContract } from 'wagmi';

const useSeatReceivers = () => {
  const chainId = useChainId();
  const { data: useSeatReceivers } = useReadContract({
    address: TicketNftContractAddress,
    abi: TicketNftContract.abi,
    chainId,
    functionName: 'getUsedReceivers',
    args: [],
  });

  return useSeatReceivers as string | undefined;
};

export default useSeatReceivers;
