import express from 'express';

import {createStudent,getStudents,getStudentId,createStudents,findByCollegeId} from '../controllers/students.js';

const router = express.Router();

router.post('/', createStudent);
router.post('/dbstudents', createStudents);
router.get('/',getStudents);
router.get('/:id',getStudentId);
router.get('/college/:id',findByCollegeId);

export default router;