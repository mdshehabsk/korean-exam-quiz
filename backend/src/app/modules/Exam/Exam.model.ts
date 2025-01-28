import mongoose from "mongoose";
import { ISet } from "./Exam.interface";

const questionsSchema = {
  questionId: {
    type: Number,
    required: true,
  },
  questionType: {
    type: String,
    enum: ["reading", "listening"],
    required: true,
  },
  questionTitle: {
    type: String,
  },
  questionDescription: {
    type: String,
    required: true,
  },
  questionDescriptionType: {
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
  questions: [questionsSchema],
});

export const SetModel = mongoose.model("set", setSchema);
