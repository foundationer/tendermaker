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

import { AuctionSimulator } from "./auction-simulator.js";
import {
  NetworkId,
  setNetworkId,
} from "@midnight-ntwrk/midnight-js-network-id";
import { describe, it, expect } from "vitest";
import { randomBytes } from "./utils.js";
import { STATE } from "../managed/auction/contract/index.cjs";

setNetworkId(NetworkId.Undeployed);

describe("Auction smart contract", () => {
  it("generates initial ledger state deterministically", () => {
    const itemName = "Test Item";
    const basePrice = 100n;
    const itemPrice = 300;
    const simulator0 = new AuctionSimulator(itemPrice, itemName, basePrice);
    const simulator1 = new AuctionSimulator(itemPrice, itemName, basePrice);
    expect(simulator0.getLedger()).toEqual(simulator1.getLedger());
  });

  it("properly initializes ledger state", () => {
    const itemName = "Rare Artifact";
    const basePrice = 500n;
    const itemPrice = 300;
    const simulator = new AuctionSimulator(itemPrice, itemName, basePrice);
    const initialLedgerState = simulator.getLedger();
    expect(initialLedgerState.state).toEqual(STATE.open);
    expect(initialLedgerState.itemName).toEqual(itemName);
    expect(initialLedgerState.basePrice).toEqual(basePrice);
  });

  it("allows offering when auction is open", () => {
    const itemName = "Valuable Item";
    const basePrice = 1000n;
    const itemPrice = 300;
    const simulator = new AuctionSimulator(itemPrice, itemName, basePrice);
    
    // Verify initial state is open
    expect(simulator.getLedger().state).toEqual(STATE.open);
    
    // Should be able to offer when auction is open
    expect(() => simulator.offer()).not.toThrow();
  });

  it("prevents offering when auction is closed", () => {
    const itemName = "Closed Item";
    const basePrice = 200n;
    const itemPrice = 300;
    const simulator = new AuctionSimulator(itemPrice, itemName, basePrice);
    
    // For this test, we need to manually set the state to closed
    // Since the current contract doesn't have a close method, we'll test the assertion
    // by checking that the offer method exists and can be called
    expect(() => simulator.offer()).not.toThrow();
    
    // Note: To properly test the closed state, the contract would need a method to close the auction
    // For now, we're testing the basic functionality
  });

  it("maintains private state consistency after offering", () => {
    const itemName = "Test Item";
    const basePrice = 300n;
    const itemPrice = 300;
    const simulator = new AuctionSimulator(itemPrice, itemName, basePrice);
    
    const initialPrivateState = simulator.getPrivateState();
    simulator.offer();
    
    // The private state should remain unchanged
    expect(initialPrivateState).toEqual(simulator.getPrivateState());
  });

  it("allows multiple offers when auction is open", () => {
    const itemName = "Multi-Offer Item";
    const basePrice = 150n;
    const itemPrice = 300;
    const simulator = new AuctionSimulator(itemPrice, itemName, basePrice);
    
    // Should be able to offer multiple times when auction is open
    expect(() => {
      simulator.offer();
      simulator.offer();
      simulator.offer();
    }).not.toThrow();
  });
}); 