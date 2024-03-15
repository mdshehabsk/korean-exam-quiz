

import express from 'express'
import { ExamControllers } from './Exam.controller';


const router = express.Router()


router.get('/all-set',)

router.get('/set/:id',ExamControllers.getSingleSet)


export const ExamRoutes = router;