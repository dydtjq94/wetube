import mongoose, { mongo } from "mongoose";

// document name, schema(형태) 모델은 실제 data
const VideoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: `File URL is required`,
  },
  title: {
    type: String,
    required: `Title is required`,
  },
  description: {
    type: String,
  },
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  // 누가 만든지 추가
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const model = mongoose.model("Video", VideoSchema);

export default model;
