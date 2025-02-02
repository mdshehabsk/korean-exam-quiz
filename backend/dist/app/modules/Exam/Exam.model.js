"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
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
const setSchema = new mongoose_1.default.Schema({
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
        enum: ['status', 'draft'],
        default: 'draft',
        required: true
    },
    questions: [questionsSchema],
});
exports.SetModel = mongoose_1.default.model("set", setSchema);
