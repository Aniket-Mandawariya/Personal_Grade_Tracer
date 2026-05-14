const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (
      !process.env.MONGODB_URI ||
      process.env.MONGODB_URI.includes("your_mongodb_atlas_connection_string_here")
    ) {
      throw new Error("Please add a valid MongoDB Atlas connection string in backend/.env");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Atlas connected successfully.");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
