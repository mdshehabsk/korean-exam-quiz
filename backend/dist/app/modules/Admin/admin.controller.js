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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const admin_service_1 = require("./admin.service");
const getAllSetForAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allSet = yield admin_service_1.AdminServices.getAllSetForAdmin();
    (0, sendResponse_1.default)(res, {
        data: allSet,
        statusCode: http_status_1.default.OK,
        success: true,
        message: "get all set successful",
    });
}));
const getSingleSetForAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { setId } = req.params;
    const set = yield admin_service_1.AdminServices.getSingleSetForAdmin(setId);
    (0, sendResponse_1.default)(res, {
        data: set,
        statusCode: http_status_1.default.OK,
        success: true,
        message: "set get successful",
    });
}));
const addSet = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    const { setCreated } = yield admin_service_1.AdminServices.addSet(name, description);
    if (setCreated) {
        (0, sendResponse_1.default)(res, {
            data: setCreated,
            statusCode: http_status_1.default.CREATED,
            success: true,
            message: "set create successful",
        });
    }
}));
const updateSet = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { setId } = req.params;
    const { status } = req.body;
    const { updated, setIncomplete } = yield admin_service_1.AdminServices.updateSet({ setId, status });
    if (setIncomplete) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.FORBIDDEN,
            success: true,
            error: 'Set is incomplete'
        });
    }
    if (!['publish', 'draft'].includes(status)) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.FORBIDDEN,
            success: true,
            error: 'wrong status'
        });
    }
    if (updated) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            data: updated,
            message: 'updated successfull'
        });
    }
}));
exports.AdminController = {
    getAllSetForAdmin,
    getSingleSetForAdmin,
    addSet,
    updateSet
};
