const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id:{
      type : mongoose.Schema.Types.ObjectId,
      required : true,
      ref : "User",
    },
    name: {
      type: String,
      required: [true, "Please add the contact full Name"],
    },
    email: {
      type: String,
      required: [true, "Please add the contact email address"],
    },
    phone: {
      type: String,
      required: [true, "Please add the contact phone numbers"],
    },
    cityName: {
      type: String,
      required: [true, "Please add the contact city"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
