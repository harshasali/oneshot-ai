import express from 'express';

import {createCourse,createCourses,getCourses,getCourseByName} from '../controllers/courses.js';

const router = express.Router();

router.post('/', createCourse);
router.post('/excel', createCourses);
router.get('/', getCourses);
router.get('/:name',getCourseByName);

export default router;