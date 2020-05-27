import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: `Text is required`,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // 누가 만든지 추가
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const model = mongoose.model("Comment", CommentSchema);
export default model;
