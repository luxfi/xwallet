/**
 * Built-in Testnet Configurations
 *
 * These testnets are pre-configured for development and testing purposes.
 * They can be automatically added when the wallet is in development mode.
 */

import { TestnetChainBase } from '@/background/service/customTestnet'

/**
 * LUX_LOCAL - Local Development Node
 *
 * Chain ID: 1337
 * Use with local luxd node for development and testing
 *
 * Start local node:
 *   docker compose up luxd
 * Or:
 *   lux network start local
 */
export const LUX_LOCAL: TestnetChainBase = {
  id: 1337,
  name: 'Lux Local',
  nativeTokenSymbol: 'LUX',
  rpcUrl: 'http://localhost:9650/ext/bc/C/rpc',
  scanLink: 'http://localhost:9650/explorer',
}

/**
 * All built-in testnets available for quick setup
 */
export const BUILTIN_TESTNETS: TestnetChainBase[] = [
  LUX_LOCAL,
]

/**
 * Check if a chain ID is a built-in testnet
 */
export function isBuiltinTestnet(chainId: number): boolean {
  return BUILTIN_TESTNETS.some(t => t.id === chainId)
}

/**
 * Get built-in testnet by chain ID
 */
export function getBuiltinTestnet(chainId: number): TestnetChainBase | undefined {
  return BUILTIN_TESTNETS.find(t => t.id === chainId)
}
