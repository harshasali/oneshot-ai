import express from 'express';
import mongoose from 'mongoose';

import CollegeRepo from '../models/collegeRepo.js';
import CourseRepo from '../models/coursesRepo.js';

import csv from 'csv-parser';
import fs from 'fs';

const router = express.Router();

export const createCollege = async (req, res) => {
    const collegeRepo = new CollegeRepo({ id: 1, name: "Name", foundedYear: 1, state: "MH", city: "Name",country: "Name",studentNo:1,courses:["6150c4e42fb2c19d70d9913b","6150c4d6e12b4f9d6350456a"]})
    try {

        await collegeRepo.save();

        res.status(201).json(collegeRepo );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getColleges = async (req, res) => { 
    try {
        const collegeRepo = await CollegeRepo.find().populate('courses');
        res.status(200).json(collegeRepo);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getCollegeId = async (req, res) => { 
    const { id } = req.params;
    try {
        const collegeRepo = await CollegeRepo.find({id: id}).populate('courses');
        res.status(200).json(collegeRepo);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getCollegeName = async (req, res) => { 
    const { name } = req.params;
    try {
        const collegeRepo = await CollegeRepo.find({name: name}).populate('courses');
        res.status(200).json(collegeRepo);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getCollegeStatewise = async (req, res) => { 
    const { state } = req.params;
    try {
        const collegeRepo = await CollegeRepo.find({state: state});
        
        res.status(200).json(collegeRepo);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const stateWiseCounts = async (req, res) => { 
    const { state } = req.params;
    try {
        const collegeRepo = await CollegeRepo.aggregate([ {
            '$group': {
                '_id': '$state',
                'count': {'$sum' : 1}
            }
        }])
        
        res.status(200).json(collegeRepo);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createColleges = async (req, res) => { 
    const result = []
    fs.createReadStream("/Users/harshasali/Desktop/Placements/Companies/Oneshot_AI/Dataset/CollegeDB.csv")
        .pipe(csv({}))
        .on("data", (data) => {
            // console.log(data)
            // console.log(data.courses)
            var a = JSON.parse(data.courses)
           // console.log(a[0]);
           let coursesArrID = [];

            const collegeRepo = new CollegeRepo({ id: data.collegeID, name: data.collegeName, foundedYear: data.collegeFound, state: data.state, city: data.city,country: data.country,studentNo:data.noStudent})
            collegeRepo.save(function(err,college){

              if(college){

                for(let arr=0;arr<a.length;arr++){

                    const courseRepo = CourseRepo.find({name:a[arr]},function(err,value){
                         console.log("find course in db response");
                         console.log(value);
                        if (value.length == 0) {
                            console.log("null enter")
                        }
                        else{ 
                             console.log("value already exists");
                             const courseRepo = CollegeRepo.updateOne(
                                { _id: college._id},
                                { $push: { "courses" : value[0]._id } },function(err,value){
                                         console.log("update response");
                                    }
                             )
                        }
                    });
                   }
              }
            });
        }
        )
        .on("end", () => {
            console.log("Executed");    
        });
    }

    export const addCollegesToCourses = async (req, res) => { 
        const result = []
        fs.createReadStream("/Users/harshasali/Desktop/Placements/Companies/Oneshot_AI/Dataset/CollegeDB.csv")
            .pipe(csv({}))
            .on("data", (data) => {
                console.log(data)
                
               const college =CollegeRepo.find({id: data.collegeID},function(err,college){
                    console.log("find Coll")
                  console.log(college[0]);
    
                  if(college.length>0){
                    console.log(college[0]._id)
                    console.log(college[0].courses)
                    const courseRepo = CourseRepo.updateMany(
                        { _id: {
                            $in: college[0].courses
                        }},
                        { $push: { "colleges" : college[0]._id } },function(err,value){
                                 console.log("update response");
                                 console.log(value);
                            }
                     )
                  }
                });
            }
            )
            .on("end", () => {
                console.log("Executed");    
            });
        }

    const colleageInsertCourses = function(courseIds,collegeId){
        const courseRepo = CourseRepo.updateMany(
            { _id: {
                $in: courseIds
            }},
            { $push: { "colleges" : collegeId } },function(err,value){
                     console.log("update response");
                     console.log(value);
                }
         )
    }

    export const getCollegeSuggetions = async (req, res) => { 
        const { id } = req.params;
        console.log(id)
        try {
            const college = await CollegeRepo.find({id: id});
            console.log(college)
            const collegeRepo = await CollegeRepo.find({state: college[0].state});
            console.log("coll Repo")
            console.log(collegeRepo)
            let collSortCourse = collegesSortViaCourses(college[0], collegeRepo);
            res.status(200).json(collSortCourse);
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    }

    function collegesSortViaCourses(college,collegeRepo) {
        const map = new Map();
        const scores = [];
        let score = 0;
        collegeRepo.forEach(element => {
            console.log(element.id);
            if (college.id !== element.id) {
                score = coursesScore(college.courses, element.courses);
                if (map.has(score)) {
                    let list = map.get(score);
                    list.push(element);
                    map.set(score, list);
                } else {
                    scores.push(score);
                    map.set(score, [element]);
                }
            }
        });
        scores.sort(function (a, b) { return b - a; });
        console.log(scores);
    
        let suggestion = [];
    
        scores.forEach(score => {
            let list = map.get(score);
            list.forEach(coll => {
                console.log(score + " " + coll.id);
                suggestion.push(coll);
            });
        });
        return suggestion;
    }

    const coursesScore = (mainArray, compareArray) => {
        console.log("length : "+mainArray.length+" "+compareArray.length)
        // if the other array is a falsy value, return
        if (!mainArray || !compareArray)
            return 0;
        let score = 0;
    
        mainArray.forEach(e => {
            compareArray.forEach(e1 => {
                if(e.equals(e1)){
                    score++
                }
            });
        });    
        console.log(" sc "+score);
        return score;
    }