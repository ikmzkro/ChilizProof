# 🌶 ChilizProof 🌶

<div align="center">
  <img src="./asset/supporter.png" alt="🌶ChilizProof🌶 Image" width="50%">
</div>

## 🌶 Introduction 🌶

このプロジェクトは、Chiliz Chain上で発行されたファントークンをファンの貢献量に応じて分配したり来場証明NFTを配布することで、Chilizが直面しているファンのエンゲージメント、所有権、インタラクティブ性の制限といった課題に対処することを目的としています。ファンの貢献量に応じたトークン分配コントラクトは、その汎用性、安全性、移植性を持つため、この目的に非常に適しています。これらの特性は、既に発行されたChiliz Chain上のファントークンの流動性供給を拡大することに理想的です。さらに、Move to EarnプラットフォームであるPUMLやStakingコントラクトと連携しクラブへの貢献機会を増やすことで、ファンコミュニティを大幅に拡大させることができます。

## 🌶 UseCase 🌶

1. スタジアム観戦

    - スタジアム観戦では、貢献量に応じたファントークンと来場証明NFTを発行し、特典や専用入場ゲートのアクセス権を提供します。応援リーダーに近い座席ほど、ハーフタイムにMOMの投票を行い結果が当たるほど多くのファントークンを取得可能なスキームを構築し、当選者にはこうけんｙに応じた分配率のファントークンを提供することでファンエンゲージメントを促進します。

2. NFT所有者限定コミュニティ

    - NFT所有者限定コミュニティは、スタジアム観戦に来たユーザに対して参加証明書としてNFTを発行し、ファンコミュニティへのアクセス権や専用入場ゲートのアクセス権を付与します。

3. NFTゲーム

    - NFTゲームでは、ファントークンをクラブ選手のNFTに交換することでスカッドを組み、Chiliz Chain上でファントークンを発行している他クラブで競うゲームに利用できます。

## 🌶 Architecture 🌶

<div align="center">
  <img src="./asset/architecture4.png" alt="🌶ChilizProof🌶 Image" width="100%">
</div>

### Component Relationships

- AdminはCreateFanTokenContract、SendFanTokenContract、NftContractをデプロイします。
- Userが座席に設定されたQRコード読み取りMOM投票を行うと、アドレス、座席ブロック、投票選手がシステムに登録され、CalculateContributionRateMethodをコールします。
- アドレスとCalculateContributionRateMethodで求まった分配比率で構成された配列に対して、CreateMerkleTreeMethodを用いてマークルツリーを構築します。
- アドレスと配布個数で構成された配列に対して、CreateMerkleTreeMethodを用いてマークルツリーを構築します。
- CreateMerkleTreeMethodで求められたマークルツリーとマークルプルーフがAdminに連携されます。
- Adminは試合終了後、マークルルートをSendFanTokenContract、NftContractに登録します。
- AdminはSendFanTokenContractでトークンを配布します。
- AdminはNftContractでNFTを配布します。

## 🌶 Features 🌶

### QR Code scanning functionality

QR Code scanning functionalityは、スタジアムの応援席に添付されたQRコードを読み取り、後続処理を行うフローを設計することで、観客が確かにスタジアムに来場したことを証明できるようにします。

### CalculateContributionRateMethod

CalculateContributionRateMethodは、ファンの座席が応援リーダーの座席に近いほど、またMOM投票結果が当選しているほど、ファントークンの分配率を高めるように設計されています。これにより、サポーターの貢献度に応じた報酬を分配することが可能になります。

### CreateMerkleTreeMethod

CreateMerkleTreeMethodは、2種類のマークルツリーを構築し、求められたマークルルートとマークルプルーフを運用母体の管理者が利用できるようにします。

1. 各アドレスに対するファントークン分配量をCalculateContributionRateMethodで計算し、それを配列化した後、マークルツリーを構築します。
2. 各アドレスに対するNFT発行枚数を1と設定し、それを配列化した後、マークルツリーを構築します。

### CreateFanTokenContract

CreateFanTokenContractは、Chiliz Chain上で任意のクラブのファントークンを発行することができます。

### SendFanTokenContract

SendFanTokenContractは、下記手順で実行できます。

1. CreateFanTokenContractで発行されたファントークンを使用します。
2. CreateMerkleTreeMethodで計算されたマークルルートをコントラクトに登録します。
3. マークルプルーフを引数にしてファントークン送金関数を呼び出し、適切なアドレスと分配量に応じてファントークンを送金できます。

### NftContract

NftContractは、下記手順で実行できます。

1. CreateMerkleTreeMethodで計算されたマークルルートをコントラクトに登録します。
2. マークルプルーフを引数にしてNFT発行関数を呼び出し、適切なアドレスと分配枚数に応じてNFTを配布できます。

## 🌶 Features Developed During the Hackathon 🌶

このハッカソンでは、Featuresのプロトタイプを開発し、CalculateContributionRateMethod、CreateMerkleTreeMethod、CreateFanTokenContract、SendFanTokenContract、そしてNftContractの相互作用を示すフローシナリオを作成しました。

UserがCalculateContributionRateMethod、CreateMerkleTreeMethodを実行し、
AdminがCreateFanTokenContract、SendFanTokenContract、NftContractを実行します。

UserはMetaMaskでサイトにログインし、ファントークンおよびNFT配布結果を確認できます。

## 🌶 Usage 🌶

```
git clone git@github.com:ikmzkro/Chiliz-Sports-Hackathon.git && cd Chiliz-Sports-Hackathon
cd frontend && yarn && yarn dev
```

## 🌶 Demo 🌶

## Deployed Contract Address

### Chiliz Spicy Testnet

| Contract Name        | Address                                    |
| -------------------- | ------------------------------------------ |
| Forwarder            |  |
| MintNFT              |  |
| EventManager         |  |
| SecretphraseVerifier |  |
| OperationController  |  |

### Sepolia Testnet
| Contract Name        | Address                                    |
| -------------------- | ------------------------------------------ |
| Forwarder            |  |
| MintNFT              |  |
| EventManager         |  |
| SecretphraseVerifier |  |
| OperationController  |  |


## 🌶 License 🌶
This project is licensed under the MIT License.

## 🌶 Team 🌶

For an introduction to our team, click [here](/docs/team.md).

## 🌶 Contact 🌶

Email: ikmzkro@gmail.com

Project Link: https://github.com/ikmzkro/ChilizProof
