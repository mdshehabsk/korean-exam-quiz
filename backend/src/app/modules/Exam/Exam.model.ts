import mongoose from "mongoose";
import { ISet } from "./Exam.interface";

const questionsSchema = {
  type: {
    type: String,
    enum: ["reading", "listening"],
    required: true,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  descriptionType: {
    type: String,
    enum: ["text", "audio", "image"],
    required: true,
  },
  options: [
    {
      type: String,
      require: true,
    },
  ],
  optionsType: {
    type: String,
    enum: ["text", "audio", "image"],
  },
  answer: {
    type: String,
    required: true,
  },
};

const setSchema = new mongoose.Schema<ISet>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum : ['status','draft'],
    default : 'draft',
    required : true
  },
  questions: [questionsSchema],
});

export const SetModel = mongoose.model("set", setSchema);
