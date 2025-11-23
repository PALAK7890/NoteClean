const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    content: {
      type: String,
      required: true
    },

    tags: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);


const User = mongoose.model("User", userSchema);
const Note = mongoose.model("Note", noteSchema);


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Your DataBase Is Connected");
  } catch (error) {
    console.log("DB Error:", error);
  }
};


module.exports = {
  User,
  Note,
  connectDB
};
