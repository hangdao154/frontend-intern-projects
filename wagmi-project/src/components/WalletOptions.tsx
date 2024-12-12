import * as React from 'react'
import { Connector, useConnect, useChainId } from 'wagmi'

export function WalletOptions() {
    const chainId = useChainId()
    const { connectors, connect } = useConnect()

    return (
        <div className='mx-auto mt-[50px] flex gap-[20px] w-[70%]'>
            {connectors.map((connector) => (
                <WalletOption
                    key={connector.uid}
                    connector={connector}
                    onClick={() => connect({ connector, chainId })}
                />
            ))}
        </div>
    )
}

function WalletOption({ connector, onClick }: { connector: Connector, onClick: () => void }) {
    const [ready, setReady] = React.useState(false);
    React.useEffect(() => {
        (async () => {
            const provider = await connector.getProvider();
            setReady(!!provider);
        })();
    }, [connector, setReady]);

    return (
        <button
            className="bg-black text-white py-[10px] px-[20px] rounded-full flex-1 hover:bg-gray-900"
            disabled={!ready}
            onClick={onClick}
            type="button">
            {connector.name}
        </button>
    );
}