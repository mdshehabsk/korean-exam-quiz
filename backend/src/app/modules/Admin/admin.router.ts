import { Router } from "express";
import { AdminController } from "./admin.controller";



const router = Router();


router.get('/exam/get-all-set', AdminController.getAllSetForAdmin )

router.get('/exam/get-single-set/:setId',AdminController.getSingleSetForAdmin)



export const AdminRoutes = router;
