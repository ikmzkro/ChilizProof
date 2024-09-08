import {useAccount, useChainId} from "wagmi";
import useNftContractWrite, { ValidFunctionName } from "./useNftContractWrite";
import { VisselKobeVSTottenhamHotspurFCTokenURI } from "@/contracts/constant";

const useMintTicketNft = (selectedSeat?: any, selectedRole?: any) => {
  const {address} = useAccount();
  const imageURI = VisselKobeVSTottenhamHotspurFCTokenURI
  const currentNetworkId = useChainId();
  const seatNumber = parseInt(selectedSeat?.replace("Seat ", ""), 10);
  /**
   * TicketNftをMintするメソッド
   */
  const {writeAsync, isLoading} = useNftContractWrite({
    functionName: "safeMint" as ValidFunctionName,
    args: [address!, imageURI, String(seatNumber), selectedRole],
    chainId: currentNetworkId,
    enabled: currentNetworkId === 88882,
  });

  return {writeAsync, isLoading};
};

export default useMintTicketNft;
