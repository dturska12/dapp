// disable es-lint
import "./polyfills";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { XMTPProvider } from "@xmtp/react-sdk";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import App from "./controllers/AppController";
import { isAppEnvDemo } from "./helpers";
import { mockConnector } from "./helpers/mockConnector";

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [
    infuraProvider({ apiKey: import.meta.env.VITE_INFURA_ID ?? "" }),
    publicProvider(),
  ],
);

const { connectors } = getDefaultWallets({
  appName: "XMTP Inbox Web",
  projectId: import.meta.env.VITE_PROJECT_ID,
  chains,
});

const wagmiDemoClient = createClient({
  autoConnect: true,
  connectors: [mockConnector],
  provider,
  webSocketProvider,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

createRoot(document.getElementById("root") as HTMLElement).render(
  <WagmiConfig client={isAppEnvDemo() ? wagmiDemoClient : wagmiClient}>
    <RainbowKitProvider chains={chains}>
      <StrictMode>
        <XMTPProvider>
          <App />
        </XMTPProvider>
      </StrictMode>
    </RainbowKitProvider>
  </WagmiConfig>,
);
