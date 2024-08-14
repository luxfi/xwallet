/**
 * @jest-environment jsdom
 */
import daiChainMigration from '../../src/migrations/daiChainMigration';
import { ConnectedSite, PermissionStore } from 'background/service/permission';
import { CHAINS_ENUM } from 'consts';

const data: { permission: PermissionStore } = {
  permission: {
    dumpCache: [
      {
        e: 0,
        k: 'https://luxwallet-xyz.vercel.app',
        v: {
          chain: 'DAI' as CHAINS_ENUM,
          icon: '',
          isSigned: false,
          isTop: false,
          name: 'lux',
          origin: 'https://luxwallet-xyz.vercel.app',
        } as ConnectedSite,
      },
      {
        e: 0,
        k: 'https://uniswap.com',
        v: {
          chain: 'DAI' as CHAINS_ENUM,
          icon: '',
          isSigned: false,
          isTop: false,
          name: 'lux',
          origin: 'https://luxwallet-xyz.vercel.app',
        } as ConnectedSite,
      },
      {
        e: 0,
        k: 'https://luxwallet-xyz.vercel.app',
        v: {
          chain: 'ETH' as CHAINS_ENUM,
          icon: '',
          isSigned: false,
          isTop: false,
          name: 'lux',
          origin: 'https://luxwallet-xyz.vercel.app',
        } as ConnectedSite,
      },
    ],
  },
};

test('should migrate data', () => {
  return daiChainMigration.migrator(data).then((result) => {
    expect(result!.permission!.dumpCache).toEqual([
      {
        e: 0,
        k: 'https://luxwallet-xyz.vercel.app',
        v: {
          chain: 'GNOSIS' as CHAINS_ENUM,
          icon: '',
          isSigned: false,
          isTop: false,
          name: 'lux',
          origin: 'https://luxwallet-xyz.vercel.app',
        },
      },
      {
        e: 0,
        k: 'https://uniswap.com',
        v: {
          chain: 'GNOSIS' as CHAINS_ENUM,
          icon: '',
          isSigned: false,
          isTop: false,
          name: 'lux',
          origin: 'https://luxwallet-xyz.vercel.app',
        },
      },
      {
        e: 0,
        k: 'https://luxwallet-xyz.vercel.app',
        v: {
          chain: 'ETH' as CHAINS_ENUM,
          icon: '',
          isSigned: false,
          isTop: false,
          name: 'lux',
          origin: 'https://luxwallet-xyz.vercel.app',
        },
      },
    ]);
  });
});

test('return undefined for new user', () => {
  daiChainMigration
    .migrator({ permission: undefined })
    .then((result) => expect(result).toBeUndefined());
});
