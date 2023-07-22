# ChitChatChain Dapp

**This is a fork of [XMTP Inbox web](https://github.com/xmtp-labs/xmtp-inbox-web) used to demonstrate [ChitChatChain Bot](https://github.com/ETHGlobalParis/xmtp-bot)**

The XMTP Inbox app is built with React and the [XMTP client SDK for JavaScript](https://github.com/xmtp/xmtp-js) (`xmtp-js`).

## Get started

### Configure Infura

The XMTP Inbox app uses Infura to enable wallet apps to connect to the Ethereum blockchain.

Add your Infura API key to `.env.local`.

```
VITE_INFURA_ID={YOUR_INFURA_API_KEY}
```

To learn how to create an Infura API key, see [Getting started](https://docs.infura.io/infura/getting-started) in the Infura docs.

### Configure WalletConnect

This project uses WalletConnect to allow you to connect a wallet on your phone to the dapp.

Add your WalletConnect API key to `.env.local`.

```
VITE_PROJECT_ID={YOUR_WALLETCONNECT_API_KEY}
```

### Configure XMTP Environment

Connect to production environment to connect to real accounts.

```
VITE_XMTP_ENVIRONMENT="production"
```

### Install the package

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

## Functionality

### Wallet connections

The XMTP Inbox app uses [RainbowKit](https://www.rainbowkit.com/) to enable users to connect a Coinbase Wallet, MetaMask, Rainbow, or WalletConnect-compatible wallet app.

This app also uses [wagmi](https://wagmi.sh/) to supply an [ethers Signer](https://docs.ethers.org/v5/api/signer/). The XMTP message API client needs this Signer to enable the user's blockchain account to sign messages that create and enable their XMTP identity. This XMTP identity is what enables a user to send and receive messages.

Specifically, the user must provide two signatures using their connected blockchain account:

1. A one-time signature that is used to generate the account's private XMTP identity
2. A signature that is used on app startup to enable, or initialize, the XMTP message API client with that identity

### Chat conversations

The XMTP Inbox app uses the `xmtp-js` [Conversations](https://github.com/xmtp/xmtp-js#conversations) abstraction to list the available conversations for a connected wallet and to listen for or create new conversations. For each conversation, the app gets existing messages and listens for or creates new messages. Conversations and messages are kept in a lightweight store and made available through `XmtpProvider`.
