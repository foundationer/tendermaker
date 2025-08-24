import { contracts, type AuctionPrivateState } from '@midnight-ntwrk/contract';
import type { ImpureCircuitId, MidnightProviders } from '@midnight-ntwrk/midnight-js-types';
import type { DeployedContract, FoundContract } from '@midnight-ntwrk/midnight-js-contracts';

// Get the dynamic contract module
const getContractModule = () => {
  const contractNames = Object.keys(contracts);
  if (contractNames.length === 0) {
    throw new Error('No contract found in contracts object');
  }
  return contracts[contractNames[0]];
};

const contractModule = getContractModule();

export type { AuctionPrivateState };
export type AuctionCircuits = ImpureCircuitId<typeof contractModule.Contract>;

export const auctionPrivateStateId = 'auctionPrivateState';

export type AuctionProviders = MidnightProviders<AuctionCircuits, typeof auctionPrivateStateId, AuctionPrivateState>;

export type AuctionContract = typeof contractModule.Contract;

export type DeployedCounterContract = DeployedContract<AuctionContract> | FoundContract<AuctionContract>;
