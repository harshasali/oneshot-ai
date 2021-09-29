import mongoose from 'mongoose';

const studentSchema = mongoose.Schema({
    id: Number,
    name: String,
    batch: Number,
    collegeId: Number,
    skills: String,
})

var StudentRepo = mongoose.model('Students', studentSchema);

export default StudentRepo;