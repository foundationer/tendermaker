import { type Logger } from 'pino';
export * from './api.js';
/**
 * Contract information interface
 */
export interface ContractInfo {
    contractName: string;
    functions: Array<{
        name: string;
        parameters: Array<{
            name: string;
            type: string;
        }>;
        returnType: string;
        readOnly: boolean;
        description: string;
    }>;
    ledgerState: Array<{
        name: string;
        type: string;
    }>;
    witnesses: Array<{
        name: string;
        ledgerType: string;
        privateType: string;
        returns: string[];
    }>;
}
/**
 * Enhanced API with dynamic contract analysis
 */
export declare class EnhancedContractAPI {
    private analyzer;
    private cliGenerator;
    private contractInfo;
    constructor(logger: Logger);
    initialize(): Promise<ContractInfo>;
    getContractInfo(): ContractInfo | null;
    generateMenuItems(): any[];
    generateMenuQuestion(menuItems: any[]): string;
    /**
     * Execute offer function
     */
    offer(...args: any[]): Promise<any>;
}
export declare const CONTRACT_METADATA: {
    readonly name: "Auction Contract";
    readonly fileName: "auction.compact";
    readonly generatedAt: "2025-08-19T01:22:18.332Z";
    readonly functions: readonly [{
        readonly name: "offer";
        readonly parameters: readonly [];
        readonly returnType: "[]";
        readonly readOnly: false;
    }];
    readonly ledgerState: readonly [{
        readonly name: "state";
        readonly type: "STATE";
    }, {
        readonly name: "itemName";
        readonly type: "Opaque<\"string\">";
    }, {
        readonly name: "basePrice";
        readonly type: "Uint<32>";
    }];
    readonly witnesses: readonly [];
};
