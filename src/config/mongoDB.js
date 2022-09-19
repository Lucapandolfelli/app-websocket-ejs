import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_DB_URI);

export default mongoose;
