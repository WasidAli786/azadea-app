import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: String,
  assignee: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  created: { type: Date, default: Date.now },
  image: String,
});

export default mongoose.models.Card || mongoose.model("Card", CardSchema);
