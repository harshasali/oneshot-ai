import express from 'express';
import mongoose from 'mongoose';

import csv from 'csv-parser';
import fs from 'fs';

import CourseRepo from '../models/coursesRepo.js';

const router = express.Router();

export const createCourse = async (req, res) => {
    const courseRepo = new CourseRepo( {id: 4,name: "CE",colleges:["6150c510c8f79e9d7b280ee5"]})
    try {
        await courseRepo.save();

        res.status(201).json(courseRepo );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getCourses = async (req, res) => { 
    try {
        const courseRepo = await CourseRepo.find().populate('colleges');
        res.status(200).json(courseRepo);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getCourseId = async (req, res) => { 
    const { id } = req.params;
    try {
        const courseRepo = await CourseRepo.find({name: id}).populate('colleges');
        
        res.status(200).json(courseRepo);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createCourses = async (req, res) => {
    //const courseRepo = new CourseRepo( {id: 4,name: "CE",colleges:["6150c510c8f79e9d7b280ee5"]})
    const result = []
    fs.createReadStream("/Users/harshasali/Desktop/Placements/Companies/Oneshot_AI/Dataset/testCourses.csv")
    .pipe(csv({}))
    .on("data", (data) => {
        console.log(data.courses)
        // var a = JSON.parse(data.courses)
        // console.log(a)
        const courseRepo = new CourseRepo({name: data.courses});
courseRepo.save(function(err,val){
        console.log(val)
    });
})}

export const getCourseByName = async (req, res) => { 
    const { name } = req.params;
    try {
        const courseRepo = await CourseRepo.find({name: name}).populate('colleges');
        res.status(200).json(courseRepo);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}