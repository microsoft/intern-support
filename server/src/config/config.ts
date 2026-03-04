import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  jwtSecret: string;
  whitelistedEmails: string[];
  cosmos: {
    endpoint: string;
    key: string;
    database: string;
    container: string;
    authContainer: string;
  };
  smtp: {
    host: string;
    port: number;
    user: string;
    pass: string;
  };
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  jwtSecret: process.env.JWT_SECRET || "",
  whitelistedEmails: (process.env.WHITELISTED_EMAILS || "")
    .split(",")
    .map((e) => e.toLowerCase().trim())
    .filter(Boolean),
  cosmos: {
    endpoint: process.env.COSMOS_ENDPOINT || "",
    key: process.env.COSMOS_KEY || "",
    database: process.env.COSMOS_DATABASE || "",
    container: process.env.COSMOS_CONTAINER || "",
    authContainer: process.env.COSMOS_AUTH_CONTAINER || "auth_codes",
  },
  smtp: {
    host: process.env.SMTP_HOST || "smtp.office365.com",
    port: Number(process.env.SMTP_PORT) || 587,
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
  },
};

export default config;
