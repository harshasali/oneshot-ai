import express from 'express';
import mongoose from 'mongoose';

import StudentRepo from '../models/studentRepo.js';

import csv from 'csv-parser';
import fs from 'fs';

const router = express.Router();

export const createStudent = async (req, res) => {
    //const { title, message, selectedFile, creator, tags } = req.body;
    const studentRepo = new StudentRepo({ id: 1, name: "Name", batch: 1, collegeId:1})
    try {
        await studentRepo.save();
        res.status(201).json(studentRepo);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getStudents = async (req, res) => { 
    try {
        const studentRepo = await StudentRepo.find();
        res.status(200).json(studentRepo);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getStudentId = async (req, res) => { 
    const { id } = req.params;
    try {
        const studentRepo = await StudentRepo.find({id: id});
        
        res.status(200).json(studentRepo);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createStudents = async (req, res) => {
    fs.createReadStream("/Users/harshasali/Desktop/Placements/Companies/Oneshot_AI/Dataset/StudentDB.csv")
        .pipe(csv({}))
        .on("data", (data) => {
            console.log(data)
            const studentRepo = new StudentRepo({ id: data.studentID, name: data.studentName, batch: data.studentYearBatch, collegeId: data.collegeID,skills:data.Skills})
            studentRepo.save();
        })
}

export const findByCollegeId = async (req, res) => {
    const { id } = req.params;
    try {
        const studentRepo = await StudentRepo.find({collegeId: id});
        
        res.status(200).json(studentRepo);
    } catch (error) {
        res.status(404).json({message: error.message});
    } 
}