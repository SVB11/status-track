process.env.RAILWAY = "1";
process.env.HOST = process.env.HOST || "0.0.0.0";
process.env.PORT = process.env.PORT || "8080";
await import("./.output/server/index.mjs");
