import { WitnessContext } from '@midnight-ntwrk/compact-runtime';
declare const Ledger: any;
export declare const witnesses: {
    secretPrice: ({ privateState }: WitnessContext<typeof Ledger, AuctionPrivateState>) => [AuctionPrivateState, Number];
};
export type AuctionPrivateState = {
    readonly itemPrice: Number;
};
export declare const createActivePrivateState: (itemPrice: Number) => {
    itemPrice: Number;
};
export {};
