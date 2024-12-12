import { useAccount } from 'wagmi';
import { Account } from './Account';
import { WalletOptions } from './WalletOptions';
import { useEffect } from 'react';

export function ConnectWallet() {
  const { isConnected, address } = useAccount();
  
  useEffect(() => {
    if (isConnected) {
      console.log(`Account switched to: ${address}`);
    } else {
      console.log('Wallet disconnected');
    }
  }, [address, isConnected]);

  return (
    <div className="w-full">{isConnected ? <Account /> : <WalletOptions />}</div>
  );
}