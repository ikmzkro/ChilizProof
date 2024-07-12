# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
yarn run test test/WLAQ.test.ts
```

https://hardhat.org/hardhat-runner/docs/guides/compile-contracts

npx hardhat run scripts/baseERC721Contract.js --network sepolia	Deploy ERC721Contract

npx hardhat verify 0x5a72E74a93b7f2165e16A6949f0B5286E0206D87 --network sepolia	Verify ERC721Contract

https://sepolia.etherscan.io/address/0x5a72E74a93b7f2165e16A6949f0B5286E0206D87#code

https://ipfs.io/ipfs/bafybeigyod7ldrnytkzrw45gw2tjksdct6qaxnsc7jdihegpnk2kskpt7a/metadata1.json https://ipfs.io/ipfs/bafybeigyod7ldrnytkzrw45gw2tjksdct6qaxnsc7jdihegpnk2kskpt7a/metadata4.json

https://testnets.opensea.io/assets/sepolia/0x5a72e74a93b7f2165e16a6949f0b5286e0206d87/1

---
npx hardhat run scripts/deployMyNFT.ts --network sepolia

npx hardhat verify 0x1666718AaC4a616B1dAd002f7dcBbF0C533bcA5A --network sepolia

https://sepolia.etherscan.io/address/0x1666718AaC4a616B1dAd002f7dcBbF0C533bcA5A#writeContract

https://sepolia.etherscan.io/address/0x0fd92fb94f827b0c7cdc4e673ecc1668457b447d#writeContract


npx hardhat run scripts/deploySendERC20.ts --network sepolia

npx hardhat verify 0x101034A69D7159495bC9349a03283F0c1b0E8cA1 --network sepolia

https://sepolia.etherscan.io/address/0x101034A69D7159495bC9349a03283F0c1b0E8cA1#readContract

---

https://docs.chiliz.com/develop/basics/connect-to-chiliz-chain/connect-using-rpc

https://spicy-explorer.chiliz.com/address/0x0e821ac585B15F27DCC7cc53A7FcA44b8EC37F92/transactions#address-tabs

```
chiliz: {
  url: `https://chiliz-spicy.publicnode.com`,
  gas: 2000000,
  accounts: ["pvkey"],
},
```

https://spicy-explorer.chiliz.com/address/0x0e821ac585B15F27DCC7cc53A7FcA44b8EC37F92/transactions#address-tabs

https://testnet.chiliscan.com/address/0xCFFB1cAA83CcCE84EB73e7a9D827Ec0aB8209F22

```
chiliz: {
  url: `https://spicy-rpc.chiliz.com`,
  gas: 2000000,
  accounts: ["pvkey"],
},
```

npx hardhat run scripts/deployMyNFT.ts --network chiliz

npx hardhat verify 0xCFFB1cAA83CcCE84EB73e7a9D827Ec0aB8209F22 --network chiliz

---

コントラクトデプロイ

https://sepolia.etherscan.io/token/0xfc5B5058b2D159a01dc400891C67B40C27Ede1D3#writeContract

転送

https://sepolia.etherscan.io/tx/0xfc131f7eb4abb88bd870d10963243242eef4121b8f5bf4747e2bf5b8b39a407c

```
0	to	address	0x427fE323F17BA719c3D5794c2a84240E7Cc9A7f1
1	value	uint256	1000000000000000000
```

---

npx hardhat run scripts/deploySendChilizFanToken.ts --network sepolia

npx hardhat verify --network sepolia 0x746C1D78e0F428867325bEF9A5f9a46Ab7750A67

https://sepolia.etherscan.io/address/0x746C1D78e0F428867325bEF9A5f9a46Ab7750A67

---

npx hardhat run scripts/deployMyNFT.ts --network sepolia

npx hardhat verify 0x2c9039a11d9Fd11A7bD5da1382eF709B03DA6887 --network sepolia

https://sepolia.etherscan.io/address/0x2c9039a11d9Fd11A7bD5da1382eF709B03DA6887#writeContract

---

npx hardhat verify 0xd1484eCF258797a87E956f07E9463D88C691cd9A --network chiliz