# ChilizProof

<img width="1000" alt="スクリーンショット 2024-09-06 21 57 21" src="https://github.com/user-attachments/assets/e332e027-6b52-41db-ac1d-9a83bb955a8d">

## Demo App

https://eth-online-2024-chiliz-proof.vercel.app/

https://github.com/user-attachments/assets/f500862a-02eb-42f2-a01f-b97acb5bc883

## Description

In soccer matches, there are always supporter groups cheering from behind the goal, providing crucial support to the players. However, their activities involve various costs, such as preparation, travel expenses to distant locations, uniforms, and merchandise purchases. These burdens can make it challenging for them to attend games consistently, often resulting in empty seats in the supporter sections. Without these groups, the excitement of live matches and the players' encouragement would not be the same.

I believe that these supporter groups should receive appropriate compensation for their efforts.

To address this, we have introduced a system where attendance NFTs are issued, and only those addresses can withdraw fan tokens issued on the Chiliz Spicy Testnet based on their contribution level. This enables supporters to continue cheering for the players from the stands consistently.

## How it's made

### Issuance of Attendance Proof NFTs Using ERC721  
Traditionally, game attendance was simply verified by QR code tickets. This app aims to provide on-chain attendance proof, allowing fans to accumulate attendance records and contribution scores, thereby enhancing transparency and identifying highly dedicated supporters.

### Issuance of Fan Tokens on the Chiliz Spicy Testnet Using ERC20  
No Japanese club has issued fan tokens on Chiliz so far. If club tokens were to be issued on Chiliz, incorporating this product during matches between European clubs and Japanese clubs, held annually in summer, could boost supporter numbers not only for J-League clubs but also for overseas clubs.

### Self-Claim Model Using a Merkle Distributor Structure  
Upon successful QR scanning at the venue, the user’s wallet address and seat information are registered in the system. The system is designed to offer higher reward distribution ratios for seats closer to the leader's section, reflecting greater supporter contributions. Moreover, a secure Merkle proof-based withdrawal scheme ensures that only wallet addresses verified for attendance can withdraw rewards, enhancing the system's security.

## Deployed Chiliz Spicy Testnet Contracts for ChilizProof Application
```
export const MyNFTContractAddress = "0x0fd92fb94f827b0c7cdc4e673ecc1668457b447d"
export const baseERC20ContractAddress = "0x93A6bE70077B840a2A56BcAc8A5fac6C15F38F25"
```
