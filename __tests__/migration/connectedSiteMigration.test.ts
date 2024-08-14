/**
 * @jest-environment jsdom
 */
import { PermissionStore } from 'background/service/permission';
import { CHAINS_ENUM } from 'consts';
import connectedSiteMigration from '@/migrations/connectedSiteMigration';

const data = {
  permission: {
    dumpCache: [
      {
        e: 0,
        k: 'https://luxwallet-xyz.vercel.app',
        v: {
          chain: 'BSC' as CHAINS_ENUM,
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
          chain: 'FTM' as CHAINS_ENUM,
          icon: '',
          isSigned: false,
          isTop: false,
          name: 'lux',
          origin: 'https://luxwallet-xyz.vercel.app',
          isConnected: false,
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
          isConnected: true,
        },
      },
    ],
  },
} as { permission: PermissionStore };

test('should migrate data', () => {
  return connectedSiteMigration.migrator(data).then((result) => {
    expect(result!.permission!.dumpCache).toEqual([
      {
        e: 0,
        k: 'https://luxwallet-xyz.vercel.app',
        v: {
          chain: 'BSC' as CHAINS_ENUM,
          icon: '',
          isSigned: false,
          isTop: false,
          name: 'lux',
          origin: 'https://luxwallet-xyz.vercel.app',
          isConnected: true,
        },
      },
      {
        e: 0,
        k: 'https://uniswap.com',
        v: {
          chain: 'FTM' as CHAINS_ENUM,
          icon: '',
          isSigned: false,
          isTop: false,
          name: 'lux',
          origin: 'https://luxwallet-xyz.vercel.app',
          isConnected: false,
        },
      },
      {
        e: 0,
        k: 'https://luxwallet-xyz.vercel.app.com',
        v: {
          chain: 'ETH' as CHAINS_ENUM,
          icon: '',
          isSigned: false,
          isTop: false,
          name: 'lux',
          origin: 'https://luxwallet-xyz.vercel.app',
          isConnected: true,
        },
      },
    ]);
  });
});

test('return undefined for new user', () => {
  connectedSiteMigration
    .migrator({ permission: undefined })
    .then((result) => expect(result).toBeUndefined());
});
