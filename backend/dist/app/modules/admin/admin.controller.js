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
// vendor related function
const getPendingVendorRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit } = req.query;
    const vendors = yield admin_service_1.AdminServices.getPendingVendorRequest(Number(page), Number(limit));
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Vendors request list",
        data: vendors,
    });
}));
const updateVendorRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { vendorId } = req.params;
    const { status } = req.body;
    const { cancel, update } = yield admin_service_1.AdminServices.updateVendorRequest(vendorId, status);
    if (update) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            data: update,
            success: true,
            message: "Vendor request has been updated",
        });
    }
    if (cancel) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            data: update,
            success: true,
            message: "Vendor request has been updated",
        });
    }
}));
const updateVendorProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { vendorId } = req.params;
    const body = req.body;
    const update = yield admin_service_1.AdminServices.updateVendorProfile(vendorId, body);
    (0, sendResponse_1.default)(res, {
        data: update,
        statusCode: http_status_1.default.OK,
        success: true,
        message: "profile update successfull",
    });
}));
// product related function
const getPendingProducts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit } = req.query;
    const pendingProducts = yield admin_service_1.AdminServices.getPendingProducts(Number(page), Number(limit));
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        data: pendingProducts,
        success: true,
        message: " product get successfull ",
    });
}));
const updateProductStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const { productStatus } = req.body;
    // console.log(productId, productStatus);
    const updatedProduct = yield admin_service_1.AdminServices.updateProductStatus(productId, productStatus);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        data: updatedProduct,
        success: true,
        message: "product update successful",
    });
}));
const getApprovedVendor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const result = yield admin_service_1.AdminServices.getApprovedVendor(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        data: result,
        success: true,
        message: "All Approved Vendor Retrieved Successfully",
    });
}));
exports.AdminController = {
    getPendingVendorRequest,
    updateVendorRequest,
    updateVendorProfile,
    // product related function
    getPendingProducts,
    updateProductStatus,
    getApprovedVendor,
};
