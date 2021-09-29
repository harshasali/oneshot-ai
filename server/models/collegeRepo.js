import mongoose from 'mongoose';

const collegeSchema = mongoose.Schema({
    id: Number,
    name: String,
    foundedYear: Number,
    state: String,
    city: String,
    country: String,
    studentNo: Number,
    courses: [
        {type: mongoose.Schema.Types.ObjectId,ref:'courses'}
    ],
})

var CollegeRepo = mongoose.model('colleges', collegeSchema);

export default CollegeRepo;