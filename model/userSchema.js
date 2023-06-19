import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name : String, 
    email : String,
    password : String,
    id : Number
})

let studentModel = mongoose.model('STUDENT', studentSchema);
export default studentModel;