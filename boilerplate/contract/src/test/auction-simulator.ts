// This file is part of midnightntwrk/example-bboard.
// Copyright (C) 2025 Midnight Foundation
// SPDX-License-Identifier: Apache-2.0
// Licensed under the Apache License, Version 2.0 (the "License");
// You may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {
  type CircuitContext,
  QueryContext,
  sampleContractAddress,
  constructorContext,
} from "@midnight-ntwrk/compact-runtime";
import {
  Contract,
  type Ledger,
  ledger,
} from "../managed/auction/contract/index.cjs";

/**
 * Serves as a testbed to exercise the auction contract in tests
 */
export class AuctionSimulator {
  readonly contract: Contract<{}>;
  circuitContext: CircuitContext<{}>;

  constructor(itemPrice: Number, itemName: string, basePrice: bigint) {
    this.contract = new Contract<{}>({});
    const {
      currentPrivateState,
      currentContractState,
      currentZswapLocalState,
    } = this.contract.initialState(
      constructorContext({ itemPrice }, "0".repeat(64)), itemName, basePrice
    );
    this.circuitContext = {
      currentPrivateState,
      currentZswapLocalState,
      originalState: currentContractState,
      transactionContext: new QueryContext(
        currentContractState.data,
        sampleContractAddress(),
      ),
    };
  }

  public getLedger(): Ledger {
    return ledger(this.circuitContext.transactionContext.state);
  }

  public getPrivateState(): {} {
    return this.circuitContext.currentPrivateState;
  }

  public offer(): Ledger {
    // Update the current context to be the result of executing the circuit.
    this.circuitContext = this.contract.impureCircuits.offer(
      this.circuitContext,
    ).context;
    return ledger(this.circuitContext.transactionContext.state);
  }
} 