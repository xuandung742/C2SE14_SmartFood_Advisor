const mongoose = require("mongoose");

const healthFormSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  goal: {
    type: String,
    enum: [
      "weight_loss",
      "weight_gain",
      "maintain_weight",
      "muscle_gain",
      "vitamin_support",
      "digestive_support",
    ],
    required: true,
  },
  diet: {
    type: String,
    enum: ["meat", "vegan", "keto", "gluten_free", "no_sugar"],
    required: true,
  },
  healthConditions: {
    type: [String],
    default: [],
  },
  allergies: {
    type: [String],
    default: [],
  },
  activityLevel: {
    type: String,
    enum: ["low", "moderate", "active", "very_active"],
    required: true,
  },
  additionalInfo: {
    type: String,
    default: "",
  },
});

healthFormSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

healthFormSchema.set("toJSON", {
  virtuals: true,
});

exports.HealthForm = mongoose.model("HealthForm", healthFormSchema);
exports.healthFormSchema = healthFormSchema;
