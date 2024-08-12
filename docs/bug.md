- SBTがbeforeTokenTransferのrequire文を更新する対応では実現できなくなった
  - ERC5192を利用する
  - ERC721で妥協する
- tokenOfOwnerByIndexでtokenIdを取得したかったがimport "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";でnftを発行した際にtokenIdが発番されない
  - 失敗: https://sepolia.etherscan.io/address/0x1666718AaC4a616B1dAd002f7dcBbF0C533bcA5A#readContract
  - 成功: https://sepolia.etherscan.io/address/0x0fd92fb94f827b0c7cdc4e673ecc1668457b447d#readContract
  - tokenIdを取得する方法を別で考える
  - 一旦は発行枚数が少ないのでコードでdigる
- Chiliz Spicy Testnetでのデプロイが失敗する

---

## Chiliz Spicy Testnetでのデプロイが失敗する
```
chilizTestnet: {
  chainId: 88882,
  url: `https://spicy-rpc.chiliz.com`,
  gas: 2000000,
  accounts: ["xx"],
},


npx hardhat run scripts/deployFanToken.ts --network chilizTestnet
Contract deployed to: https://testnet.chiliscan.com/address/0x526fB1172ae6166B0C1E60fc1898211d881daAd2

https://testnet.chiliscan.com/verifycontract

{"module":"contract","action":"verifysourcecode","contractaddress":"0x526fB1172ae6166B0C1E60fc1898211d881daAd2","compilerversion":"v0.8.24+commit.e11b9ed9","contractname":"FanToken.sol:FanToken","evmVersion":"","licenseType":1,"sourceCode":"{\"language\":\"Solidity\",\"settings\":{\"optimizer\":{\"enabled\":false,\"runs\":200}},\"sources\":{\"FanToken.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\npragma solidity 0.8.24;\\n\\nimport {ERC20} from \\\"@openzeppelin/contracts/token/ERC20/ERC20.sol\\\";\\n\\ncontract FanToken is ERC20 {\\n\\tconstructor() ERC20(\\\"FanToken\\\", \\\"FAN\\\") {\\n\\t\\t_mint(msg.sender, 10000_000_000_000_000_000_000);\\n\\t}\\n}\"}}}"}
```

もっかいこっちでやる

https://testnet.chiliscan.com/documentation/recipes/hardhat-verification

npx hardhat run scripts/deployFanToken.ts --network chiliz_spicy

export PRIVATE_KEY=

npx hardhat verify --network chiliz_spicy 0x5753951Ac1ea0CD2eda311386Cb8cceB1E7B3942

成功した
```
ikmz@ikmz:~/ChilizProof/contract$ npx hardhat verify --network chiliz_spicy 0x5753951Ac1ea0CD2eda311386Cb8cceB1E7B3942
[INFO] Sourcify Verification Skipped: Sourcify verification is currently disabled. To enable it, add the following entry to your Hardhat configuration:

sourcify: {
  enabled: true
}

Or set 'enabled' to false to hide this message.

For more information, visit https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-verify#verifying-on-sourcify
Successfully submitted source code for contract
contracts/FanToken.sol:FanToken at 0x5753951Ac1ea0CD2eda311386Cb8cceB1E7B3942
for verification on the block explorer. Waiting for verification result...

Successfully verified contract FanToken on the block explorer.
https://testnet.chiliscan.com/address/0x5753951Ac1ea0CD2eda311386Cb8cceB1E7B3942#code
```


721,SBT利用しないのでVerifyさえ解決すればOK
後はマークルルート系のミント系やな