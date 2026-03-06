import { CosmosClient } from "@azure/cosmos";
import config from "../config/config";

export const client = new CosmosClient({
  endpoint: config.cosmos.endpoint,
  key: config.cosmos.key,
});

export const database = client.database(config.cosmos.database);
