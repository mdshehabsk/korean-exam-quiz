

import express from 'express'
import { ExamControllers } from './Exam.controller';
import multer from 'multer';

const router = express.Router()



const upload = multer({})

router.get('/all-set',ExamControllers.getAllSet)

router.get('/set/:setId',ExamControllers.getSingleSet)


router.post('/create-set/:setId',ExamControllers.addSet)

const questionMulterFields = upload.fields([{name:'option1',maxCount:1},{name:'option2',maxCount:1},{name:'option3',maxCount:1},{name:'option4',maxCount:1},{name:'question',maxCount:1}])

router.post('/add-question/:setId',questionMulterFields,ExamControllers.addQuestion)

export const ExamRoutes = router;