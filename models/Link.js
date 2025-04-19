import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    platform: { type: String, required: true },
    url: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    color: { type: String, default: "#000000" }, // Example default color
    order: { type: Number, default: 0 }, // Example default order
  },
  {
    _id: false,
  }
);

export default LinkSchema;
