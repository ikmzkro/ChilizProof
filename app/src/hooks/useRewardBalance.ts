import {FanTokenContractAddress} from "@/contracts/constant";
import FanToken from "../contracts/FanToken.sol/FanToken.json";
import { useAccount, useChainId, useReadContract } from 'wagmi';

const useRewardBalance = () => {
  const { address } = useAccount()
  const chainId = useChainId();
  const { data: useRewardBalance } = useReadContract({
    address: FanTokenContractAddress,
    abi: FanToken.abi,
    chainId,
    functionName: 'balanceOf',
    args: [address],
  });
  return useRewardBalance as string | undefined;
};

export default useRewardBalance;
