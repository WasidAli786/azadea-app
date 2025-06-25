import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  department: String,
  password: String,
  role: { type: String, enum: ["admin", "user"] },
  created: { type: Date, default: Date.now },
  bookmarks: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Card", default: [] },
  ],
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
