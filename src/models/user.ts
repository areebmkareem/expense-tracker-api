
const mongoose= require("mongoose")
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);


userSchema.methods.generateTokenId = async function () {
  try {
    const user = this;
    let token = await jwt.sign({_id: user._id.toString()}, "SECRET");
    user.tokens = (user.tokens||[]).concat({token});
    return {user, token};
  } catch (error) {
    throw error;
  }
};

const User = new mongoose.model('users', userSchema);

module.exports=User