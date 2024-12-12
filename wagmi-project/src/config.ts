import { http, createConfig } from 'wagmi'
import { base, linea, mainnet, sepolia } from 'wagmi/chains'
import { metaMask, walletConnect, coinbaseWallet } from 'wagmi/connectors'

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

const PROJECT_ID = '3fbb6bba6f1de962d911bb5b5c9dba88'
export const CHAINS_SUPPORTED = [mainnet.id, base.id]

export const config = createConfig({
  chains: [mainnet, base, sepolia, linea],
  connectors: [
    walletConnect({ projectId: PROJECT_ID }),
    metaMask(),
    coinbaseWallet({
      appName: 'My Wagmi App',
      appLogoUrl: 'https://wagmi.sh/logo-dark.svg'
    })
  ],
  transports: {
    [linea.id]: http(),
    [mainnet.id]: http(),
    [base.id]: http(),
    [sepolia.id]: http(),
  },
})