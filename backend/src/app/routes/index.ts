import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { UserRoutes } from "../modules/User/user.route";

import { AdminRoutes } from "../modules/Admin/admin.router";
import { ExamRoutes } from "../modules/Exam/Exam.route";


const router = Router();

const moduleRotes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path:'/exam',
    route: ExamRoutes
  }

];

moduleRotes.forEach((route) => router.use(route.path, route.route));

export default router;
