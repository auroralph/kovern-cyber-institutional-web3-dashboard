import { createFileRoute } from "@tanstack/react-router";
import { Panel, SectionHeader } from "./_app.dashboard";
import { MermaidDiagram } from "@/components/cyber/MermaidDiagram";

export const Route = createFileRoute("/_app/architecture")({
  head: () => ({ meta: [{ title: "Architecture — ZK-Shield" }] }),
  component: Architecture,
});

const ERD = `erDiagram
  USERS ||--o{ TRANSACTIONS : initiates
  USERS ||--o{ ASSETS : holds
  TRANSACTIONS ||--o{ COMPLIANCE_LOGS : generates
  USERS ||--o{ COMPLIANCE_LOGS : audited_by
  ASSETS ||--o{ TRANSACTIONS : transferred_in

  USERS {
    string wallet_address PK
    string ens_name
    timestamp first_seen
    string kyc_tier
  }
  TRANSACTIONS {
    string tx_hash PK
    string from_addr FK
    string to_addr
    decimal value
    string asset
    string status
    bool is_onchain
    int block_number
  }
  ASSETS {
    string symbol PK
    string contract_addr
    int decimals
    string chain
  }
  COMPLIANCE_LOGS {
    string log_id PK
    string tx_hash FK
    string user_addr FK
    string proof_id
    string verdict
    timestamp at
  }`;

const USECASE = `flowchart LR
  subgraph Actors
    U([User])
    SC([Smart Contract])
    ZK([ZK-Validator])
  end
  subgraph System[ZK-Shield System]
    UC1((Connect Wallet))
    UC2((Sign Transaction))
    UC3((Submit Proof))
    UC4((Verify Proof))
    UC5((Finalize on Chain))
  end
  U --> UC1
  U --> UC2
  U --> UC3
  UC2 --> SC
  UC3 --> ZK
  ZK --> UC4
  UC4 --> SC
  SC --> UC5`;

const FLOW = `flowchart TD
  S([Start]) --> A[Wallet Connection]
  A --> B[Transaction Initiation]
  B --> C[ZK-Shield Privacy Processing]
  C -->|valid| D[Validator Attestation]
  C -->|invalid| X[Reject + Audit Log]
  D --> E{Consensus 2/3?}
  E -->|yes| F[Blockchain Finality]
  E -->|no| X
  F --> G[(Compliance Log)]
  X --> G
  G --> END([End])`;

function Architecture() {
  return (
    <div className="space-y-6">
      <SectionHeader title="System Architecture" subtitle="Technical documentation & data model" />
      <Panel title="Entity Relationship Diagram (ERD)">
        <MermaidDiagram chart={ERD} />
      </Panel>
      <Panel title="Use Case Diagram">
        <MermaidDiagram chart={USECASE} />
      </Panel>
      <Panel title="System Flowchart — Wallet → ZK-Shield → Finality">
        <MermaidDiagram chart={FLOW} />
      </Panel>
    </div>
  );
}
