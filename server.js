require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/db/db");
const { validateEnv } = require("./src/config/env");

const startServer = async () => {
  try {
    validateEnv();
    await connectDB();

    const port = process.env.PORT || 3000;

    app.listen(port, () => {
      console.log("Server is running on port", port);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
