import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  clientUrl: string;
  allowedOrigins: string[];
  whitelistedEmails: string[];
  entra: {
    tenantId: string;
    clientId: string;
  };
  cosmos: {
    endpoint: string;
    key: string;
    database: string;
    container: string;
  };
  resendApiKey: string;
  viewonlyBypassEmail: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  allowedOrigins: (process.env.ALLOWED_ORIGINS || process.env.CLIENT_URL || "http://localhost:5173")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean),
  whitelistedEmails: (process.env.WHITELISTED_EMAILS || "")
    .split(",")
    .map((e) => e.toLowerCase().trim())
    .filter(Boolean),
  entra: {
    tenantId: process.env.ENTRA_TENANT_ID || "",
    clientId: process.env.ENTRA_CLIENT_ID || "",
  },
  cosmos: {
    endpoint: process.env.COSMOS_ENDPOINT || "",
    key: process.env.COSMOS_KEY || "",
    database: process.env.COSMOS_DATABASE || "",
    container: process.env.COSMOS_CONTAINER || "",
  },
  resendApiKey: process.env.RESEND_API_KEY || "",
  viewonlyBypassEmail: (process.env.VIEWONLY_BYPASS_EMAIL || "")
    .toLowerCase()
    .trim(),
};

export default config;
