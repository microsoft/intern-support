# Shadow Me Interns

## Project Overview

This project establishes a centralized platform enabling Backend (BE) Interns to easily locate and shadow technical meetings. It accomplishes this by parsing unstructured email inputs sent to a "shadow inbox" by Full-Time Employees (FTEs), structuring the extracted data into explicit JSON objects using AI via logic loops, and storing the entries dynamically onto Azure CosmosDB. Finally, it presents this recorded schedule efficiently to end users via a React-based frontend polling the database backing server constantly.

## Architecture Overview

| Component              | Technology                                |
| ---------------------- | ----------------------------------------- |
| **Inbox**              | Email forwarding trigger (`@outlook.com`) |
| **Processing**         | Microsoft Logic Apps workflow engine      |
| **Data Parser**        | Azure OpenAI Agent (`gpt-4o-mini`)        |
| **Backend Storage**    | Azure Cosmos DB (serverless)              |
| **Frontend**           | React with TypeScript (Vite)              |
| **State/Data Polling** | TanStack Query `useQuery()`               |
| **API Route Setup**    | Bun Server                                |

## Application Flow

### 1. Sourcing (Data Ingestion)

- **Trigger Event:** Fires whenever a meeting forward arrives in the designated "shadow inbox" via the email connector.
- **Processing Step:** The HTML structure of the raw meeting email is stripped into clean, standard text inside Logic Apps for parsing.

### 2. Formatting (AI Logic Mapping)

A schema is explicitly applied over the unstructured text values inside an AI configuration map:

- Maps native short forms for team logic variables if included (e.g., `role: SE`).
- Prioritizes manually written mapped rules in the email body over extracted email signature definitions if a mismatch occurs.
- Includes mandatory fallback variable rules:
  - Blank default `capacity`: `1`
  - Hardcoded requirement: `joined_interns: []`

### 3. Bypassing Parse Mapping Limitations (Logic App Routing)

Logic Apps generally hide extraction agent data payloads inside hidden `lastAssistantMessage` fields nested dynamically. The standard visual token UI is bypassed entirely to get valid input mappings onto CosmosDB.

- **Variable bypass expression:** `outputs('extraction_agent')`
- A strict **Parse JSON** stage cleans the variables, mapping tokens accurately.

### 4. Storage (Azure Cosmos DB)

Connects the newly structured JSON nodes directly to insert rows into a database matching frontend structure mappings.

### 5. Frontend Display Environment (React TS / Tanstack)

A user-facing application built on React that dynamically retrieves available schedule inputs.

- **Database Polling:** Rather than refreshing constantly, TanStack Query (`useQuery`) polls the database every 5 seconds. This fetches records effectively without a constant UI refresh penalty, tracking valid objects inserted via the Logic Apps workflow.
- **Authentication:** Sessions are managed locally. Validation happens through temporary code processes sent via email, matching Microsoft `@microsoft.com` rules. Validated code responses store secure session markers in the browser cache to bypass future lockouts.
