"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/Auth/auth.route");
const user_route_1 = require("../modules/User/user.route");
const admin_router_1 = require("../modules/Admin/admin.router");
const Exam_route_1 = require("../modules/Exam/Exam.route");
const router = (0, express_1.Router)();
const moduleRotes = [
    {
        path: "/users",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/admin",
        route: admin_router_1.AdminRoutes,
    },
    {
        path: '/exam',
        route: Exam_route_1.ExamRoutes
    }
];
moduleRotes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
