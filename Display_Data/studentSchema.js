const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 30
    },
    email: {
        type: String,
        required: true,
        max: 30
    },
    institute: {
        type: String,
        required: true,
        max: 30
    },
    branch: {
        type: String,
        required: true,
        max: 30
    },
    degree: {
        type: String,
        required: true,
        max: 30
    },
    scholar: {
        type: String,
        required: true,
        max: 30
    },
    cgpa: {
        type: String,
        required: true,
        max: 30
    },
    criteriaMatched:{
        type:Number,
        required:true,
        default:0
    },
    resume: {
        type: String,
        required: true,
    },
    admin:{
        type: String,
        required: true,
    },
    interview: {
        isSelected: {
            type: Boolean,
            default: false
        },
        isInterviewed: {
            type: Boolean,
            default: false
        },
        organization: {
            type: String,
            default: ""
        },
        date: {
            type: String,
            default: undefined
        },
        time: {
            type: String,
            default: "10:00AM"
        },
        score: {
            type: Number,
            default: 0
        },
        notepad: {
            type: String,
            default: ""
        }
    }

});

mongoose.model('student', studentSchema);
