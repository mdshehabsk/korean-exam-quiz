import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { UserRoutes } from "../modules/user/user.route";

import { AdminRoutes } from "../modules/admin/admin.router";


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

];

moduleRotes.forEach((route) => router.use(route.path, route.route));

export default router;
