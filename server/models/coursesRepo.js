import mongoose from 'mongoose';

const courseSchema = mongoose.Schema({
        id: Number,
        name: String,
        colleges:[
            {type: mongoose.Schema.Types.ObjectId,ref:'colleges'}
        ]
})

var CourseRepo = mongoose.model('courses', courseSchema);

export default CourseRepo;