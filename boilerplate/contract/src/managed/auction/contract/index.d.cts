import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export enum STATE { open = 0, closed = 1 }

export type Witnesses<T> = {
  secretPrice(context: __compactRuntime.WitnessContext<Ledger, T>): [T, bigint];
}

export type ImpureCircuits<T> = {
  offer(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, []>;
}

export type PureCircuits = {
}

export type Circuits<T> = {
  offer(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, []>;
}

export type Ledger = {
  readonly state: STATE;
  readonly itemName: string;
  readonly basePrice: bigint;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<T, W extends Witnesses<T> = Witnesses<T>> {
  witnesses: W;
  circuits: Circuits<T>;
  impureCircuits: ImpureCircuits<T>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<T>,
               anItemName_0: string,
               aBasePrice_0: bigint): __compactRuntime.ConstructorResult<T>;
}

export declare function ledger(state: __compactRuntime.StateValue): Ledger;
export declare const pureCircuits: PureCircuits;
