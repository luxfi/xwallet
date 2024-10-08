import { t } from 'i18next';
import { CHAINS_LIST } from '@luxfi/common';
import { getChainList } from './chain';

export const GET_WALLETCONNECT_CONFIG = () => {
  return {
    // 1h
    maxDuration: 3600000,
    clientMeta: {
      description: t('global.appDescription'),
      url: 'https://luxwallet-xyz.vercel.app',
      icons: [
        'https://cdn.lux.network/xwallet/luxchain/122da969-da58-42e9-ab39-0a8dd38d94b8.png',
      ],
      name: 'Lux',
    },
    projectId: 'ed21a1293590bdc995404dff7e033f04',
    v2Whitelist: [
      'AMBER',
      'Zerion',
      'Bitget',
      'TP',
      'WALLETCONNECT',
      'WalletConnect',
      'FIREBLOCKS',
      'MPCVault',
      'MetaMask',
      'Rainbow',
      'imToken',
      'MATHWALLET',
      'TRUSTWALLET',
      'Utila',
      'IMTOKEN',
    ],
  };
};

export const allChainIds = getChainList('mainnet').map((item) => item.id);
