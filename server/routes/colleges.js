import express from 'express';

import {createCollege,getColleges,getCollegeId,getCollegeName,getCollegeStatewise,stateWiseCounts,createColleges,addCollegesToCourses,getCollegeSuggetions} from '../controllers/colleges.js';

const router = express.Router();

// router.get('/', getPosts);
router.post('/', createCollege);
router.get('/', getColleges);
router.get('/:id', getCollegeId);
router.get('/:name', getCollegeName);
router.get('/states/:state', getCollegeStatewise);
router.get('/stat/statewise', stateWiseCounts);
router.post('/generateColleges',createColleges);
router.post('/collegesToCourses',addCollegesToCourses)
router.get('/suggestions/:id',getCollegeSuggetions)

export default router;