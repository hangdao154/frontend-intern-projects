import { useAccount, useBalance, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';
import * as dn from 'dnum'
import { CHAINS_SUPPORTED } from '../config';

export function Account() {

  const { address, connector, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  const { data, isError, isLoading } = useBalance({
    address: address,
  })

  if (isLoading) return <div className='text-white text-center mt-[50px]'>Fetching balance…</div>
  if (isError) return <div className='text-white text-center mt-[50px]'>Error fetching balance</div>

  const formattedAddress = formatAddress(address);

  const handleWrongNetwork = () => {
    if (connector && chain && !CHAINS_SUPPORTED.some(id => id === chain.id)) {
      return (
        <div className="flex flex-col items-center">
          <div className='text-white text-center text-[24px] font-bold mt-[50px]'>Wrong network detected.</div>
          <p className='text-white text-center'>Switch to an available network:</p>
          <div className='mt-[20px] w-[50%] flex justify-center gap-[20px]'>
            {CHAINS_SUPPORTED.map(id => (
              <button
                className='flex-1 mt-[20px] bg-black text-white py-[10px] px-[20px] rounded-full hover:bg-gray-900'
                onClick={() => connector.switchChain && connector.switchChain({ chainId: id })}>
                {id}
              </button>
            ))}
          </div>
        </div>
      )
    }

    else {
      console.log('In the correct network.');
      return (
        <div className='mt-[50px] flex flex-col items-center'>
          <div className='mb-[30px]'>
            {ensAvatar
              ? (<img alt="ENS Avatar" className="avatar mx-auto" src={ensAvatar} />)
              : (<div className="avatar mx-auto" />)
            }
            <div className="flex flex-col justify-center" onClick={() => console.log(address)}>
              {address && (
                <div className="text-center text-white font-bold text-[24px]">
                  {ensName ? `${ensName} (${formattedAddress})` : formattedAddress}
                </div>
              )}
              <div className="text-center text-white font-bold">
                --------- Connected to {connector?.name} Connector ---------
              </div>
              <div className='text-center text-white'>Current network: {chain?.name}</div>
              <div className="text-center text-white mt-[20px]">
                Balance:
                <b className='block text-[32px]'>{dn.format([data!.value, data!.decimals])} {data?.symbol}</b>
              </div>
            </div>
          </div>

          <button
            className="bg-black text-white py-[10px] px-[20px] rounded-full hover:bg-gray-900"
            onClick={() => {
              console.log('Disconnecting...');
              disconnect()
            }}>
            Disconnect
          </button>
        </div>
      )
    }
  }

  return handleWrongNetwork()
}

function formatAddress(address?: string) {
  if (!address) return null;
  return `${address.slice(0, 6)}…${address.slice(38, 42)}`;
}
