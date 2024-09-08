import {
  TicketNftContractAddress,
} from "@/contracts/constant";
import TicketNftContract from "../contracts/TicketNft.sol/TicketNft.json";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { TransactionReceipt, decodeEventLog } from 'viem';
import {
  useChainId,
  useWriteContract,
} from 'wagmi';
import { waitForTransactionReceipt } from 'wagmi/actions';

import { wagmiConfig } from '@/lib/web3';

type ExtractFunctionNames<ABI> = ABI extends {
  name: infer N;
  type: 'function';
}[]
  ? N
  : never;

export type ValidFunctionName = ExtractFunctionNames<typeof TicketNftContract.abi>;

interface ContractInteractionProps<T extends ValidFunctionName> {
  functionName: T;
  args?: (string | number | bigint)[];
  value?: any;
  chainId?: number;
  onSuccessToastData?: { title: string; description?: string };
  txDescription?: string;
  onErrorToastData?: { title: string; description?: string };
  queryKeys?: (object | string | number)[][];
  transactionTimeout?: number;
  enabled: boolean;
  handleSuccess?: (data?: TransactionReceipt) => void; // passed with handlePendingTx
  waitForSubgraph?: (data?: TransactionReceipt) => void; // passed with handleSuccess
}

const useNftContractWrite = <T extends ValidFunctionName>({
  functionName,
  args,
  chainId,
  onErrorToastData,
  enabled,
}: ContractInteractionProps<T>) => {
  const userChainId = useChainId();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { writeContractAsync } = useWriteContract();

  const handleHatWrite = async () => {
    if (!enabled || !chainId || userChainId !== chainId) return null;
    setIsLoading(true);

    return writeContractAsync({
      address: TicketNftContractAddress,
      chainId: Number(chainId),
      abi: TicketNftContract.abi,
      functionName,
      args,
    }).then(async (hash) => {
      toast.info('Waiting for your transaction to be accepted...');

      const receipt = await waitForTransactionReceipt(wagmiConfig, { chainId: chainId as any, hash });
      console.log('receipt', receipt);
      
      const decodedLogs = receipt.logs.map((log) => {
        return decodeEventLog({
         abi: TicketNftContract.abi,
         data: log.data,
         topics: log.topics
       })
      })
      console.log('decodedLogs', decodedLogs);
      toast.info('Transaction submitted');
      // TODO: Mint -> My Ticket Nft Page
      router.push('/')
    }).catch((error) => {
      alert('Error!')
      console.log('Error!!', error);
      if (
        error.name === 'TransactionExecutionError' &&
        error.message.includes('User rejected the request')
      ) {
        console.log({
          title: 'Signature rejected!',
          description: 'Please accept the transaction in your wallet',
        });
        toast.error('Please accept the transaction in your wallet.');
      } else {
        console.log({
          title: 'Error occurred!',
          description:
            onErrorToastData?.description ??
            'An error occurred while processing the transaction.',
        });
        toast.error('An error occurred while processing the transaction.');
      }
    })
  }

  return {
    writeAsync: handleHatWrite,
    isLoading,
  };
};

export default useNftContractWrite;


