import { Router } from "express";
import { AdminController } from "./admin.controller";
import { validateBodyRequest } from "../../middleware/validateRequest";
import { AdminValidation } from "./admin.validation";



const router = Router();


router.get('/exam/get-all-set', AdminController.getAllSetForAdmin )

router.get('/exam/get-single-set/:setId',AdminController.getSingleSetForAdmin)

router.post("/exam/create-set",validateBodyRequest(AdminValidation.CreateSetZodSchema), AdminController.addSet);


router.patch('/exam/update-set/:setId', AdminController.updateSet)

export const AdminRoutes = router;
