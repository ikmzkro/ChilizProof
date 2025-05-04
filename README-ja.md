# PSR Simulation

## 動機 (Motivation)

プレミアリーグにおけるPSR（Profitability and Sustainability Rules／収益性と持続可能性のルール）は、クラブが過度な支出を行わず健全経営を維持するための財務規制です。エバートンやノッティンガム・フォレストなどの事例からも分かる通り、違反により勝点剥奪などの重大なペナルティが科されることがあります。

本シミュレーターは、クラブがPSRを遵守しながら補強戦略を立てられるように、**選手売却・獲得・減価償却・給与支出**を定量的に試算し、**違反リスクを視覚化**するためのツールです。

---

## プロジェクトの説明 (Project Overview)

このプロジェクトは、プレミアリーグの3年間ルールに基づいたPSR計算を、簡単に試算・可視化できるWebアプリ／CLIツールです。

主な機能：

- ✅ 選手売却／獲得の収支シミュレーション
- ✅ 選手ごとの契約期間による減価償却計算（amortization）
- ✅ 年間給与支出シミュレーション
- ✅ PSR違反ラインの検知とアラート
- ✅ 青田買い（アカデミー育成）による全額利益化も反映可能
- ✅ 勝点剥奪リスクの表示（一定ルールでスコアリング）

---

## 🛠️ 作り方 (How to Build & Run)

### 1. クローン

```bash
git clone https://github.com/yourname/psr-simulation.git
cd psr-simulation
````

### 2. 依存パッケージのインストール

```bash
# npm もしくは yarn
npm install
```

### 3. 開発サーバ起動（フロントエンドがある場合）

```bash
npm run dev
```

### 4. テスト実行

```bash
npm test
```

### 5. シミュレーションの使い方（CLI版）

```bash
node simulate.js --season 2024 --revenue 200000000 --expenses 210000000
```

---

## 📁 ディレクトリ構成

```
psr-simulation/
├── src/
│   ├── models/        # 選手・クラブ・取引モデル
│   ├── services/      # PSRロジック・計算サービス
│   ├── cli/           # CLIインターフェース
│   └── ui/            # フロントエンド（オプション）
├── tests/             # 単体テスト
├── config/            # クラブ初期データなど
└── README.md
```

---

## 🚀 今後の展望

* 契約延長・減俸などの柔軟な給与調整機能
* TransfermarktやSofaScoreとの連携による実データ対応

---

## ライセンス

MIT License

```
```
