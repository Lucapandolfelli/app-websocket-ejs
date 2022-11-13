import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  mail: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  text: {
    type: String,
    require: true,
  },
});

export default mongoose.model("Message", MessageSchema);
