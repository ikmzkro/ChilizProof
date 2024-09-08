import {FanTokenContractAddress} from "@/contracts/constant";
import FanToken from "../contracts/FanToken.sol/FanToken.json";
import { useChainId, useReadContract } from 'wagmi';

const usePoolBalance = () => {
  const chainId = useChainId();
  const { data: usePoolBalancelance } = useReadContract({
    address: FanTokenContractAddress,
    abi: FanToken.abi,
    chainId,
    functionName: 'balanceOf',
    args: [FanTokenContractAddress],
  });

  return usePoolBalancelance as string | undefined;
};

export default usePoolBalance;
