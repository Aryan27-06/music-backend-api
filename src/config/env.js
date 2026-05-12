const requiredEnvVars = [
  "MONGO_URI",
  "JWT_SECRET",
  "IMAGEKIT_PUBLIC_KEY",
  "IMAGEKIT_PRIVATE_KEY",
  "IMAGEKIT_URL_ENDPOINT",
];

const validateEnv = () => {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
};

const getAllowedOrigins = () => {
  const origins = process.env.CORS_ORIGIN || process.env.CLIENT_URL || "";

  return origins
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
};

module.exports = {
  validateEnv,
  getAllowedOrigins,
};
