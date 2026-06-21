const mongoose = require("mongoose");
const env = require("./env");

mongoose.set("strictQuery", true);

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err.message}`);
});
mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected");
});

async function connectDB() {
  try {
    const conn = await mongoose.connect(env.mongoURI, {
      serverSelectionTimeoutMS: 10_000, // 10 seconds
    });

    console.log(
      `MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`,
    );
    return conn;
  } catch (error) {
    console.error(`MongoDB Initial Bootstrap Failure: ${err.message}`);
    // Crash process immediately if initial startup database check fails
    process.exit(1);
  }
}

module.exports = { connectDB };
