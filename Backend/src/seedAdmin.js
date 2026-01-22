import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv"
import { User } from "./models/user.model.js";

dotenv.config({
    path: '../.env'
})




async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists) {
      console.log("Admin already exists. Exiting...");
      mongoose.disconnect();
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("AdminPassword123!", 12);

    await User.create({
      username: "superadmin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully!");
    mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Error creating admin:", err);
    mongoose.disconnect();
    process.exit(1);
  }
}

createAdmin();
