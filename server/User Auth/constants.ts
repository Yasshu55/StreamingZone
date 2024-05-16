import dotenv from "dotenv";
// import { base64ToPrivateKey, base64ToPublicKey } from "./utils";
dotenv.config();

export const constants = {
  Port: process.env.PORT || 6969,
  Jwtsecret : process.env.JWT_SECRET || "",
  DatabaseUrl: process.env.DATABASE_URL || "",
  GoogleClientID: process.env.GOOGLE_CLIENT_ID || "",
  GoogleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  ServerURL: process.env.SERVER_URL || "http://localhost:6969",
  ClientURL: process.env.CLIENT_URL || "http://localhost:3000",
  RefreshKey: process.env.REFRESH_KEY || "",
};