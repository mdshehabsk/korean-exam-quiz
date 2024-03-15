"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamServices = void 0;
const myExam = {
    name: "Sample Exam",
    description: "This is a sample exam.",
    reading: [
        {
            question: "Reading Question 1",
            answer: 1,
            options: [
                { id: 1, value: "Option 1" },
                { id: 2, value: "Option 2" },
                { id: 3, value: "Option 3" },
                { id: 4, value: "Option 4" },
            ]
        },
        {
            question: "Reading Question 2",
            answer: 2,
            options: [
                { id: 1, value: "Option 1" },
                { id: 2, value: "Option 2" },
                { id: 3, value: "Option 3" },
                { id: 4, value: "Option 4" },
            ]
        },
    ],
    listening: [
        {
            question: "Listening Question 1",
            answer: 1,
            options: [
                { id: 1, value: "Option 1" },
                { id: 2, value: "Option 2" },
                { id: 3, value: "Option 3" },
                { id: 4, value: "Option 4" },
            ]
        },
        {
            question: "Listening Question 2",
            answer: 2,
            options: [
                { id: 1, value: "Option 1" },
                { id: 2, value: "Option 2" },
                { id: 3, value: "Option 3" },
                { id: 4, value: "Option 4" },
            ]
        },
    ]
};
const getAllSet = () => __awaiter(void 0, void 0, void 0, function* () {
});
const getSingleSet = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return myExam;
});
exports.ExamServices = {
    getAllSet,
    getSingleSet
};
