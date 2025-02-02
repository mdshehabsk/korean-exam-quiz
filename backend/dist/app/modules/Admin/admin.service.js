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
exports.AdminServices = void 0;
const Exam_model_1 = require("../Exam/Exam.model");
const getAllSetForAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const allSet = yield Exam_model_1.SetModel.find().select('-questions');
    return allSet;
});
const getSingleSetForAdmin = (setId) => __awaiter(void 0, void 0, void 0, function* () {
    const findSet = yield Exam_model_1.SetModel.findOne({ _id: setId });
    return findSet;
});
const addSet = (name, description) => __awaiter(void 0, void 0, void 0, function* () {
    const setCreated = yield Exam_model_1.SetModel.create({
        description,
        name,
    });
    return {
        setCreated,
    };
});
const updateSet = (_a) => __awaiter(void 0, [_a], void 0, function* ({ setId, status }) {
    const foundSet = yield Exam_model_1.SetModel.findById(setId);
    if ((foundSet === null || foundSet === void 0 ? void 0 : foundSet.questions.length) !== 40) {
        return {
            setIncomplete: true
        };
    }
    const updated = yield Exam_model_1.SetModel.findByIdAndUpdate(setId, { status });
    return { updated };
});
exports.AdminServices = {
    getAllSetForAdmin,
    getSingleSetForAdmin,
    addSet,
    updateSet
};
