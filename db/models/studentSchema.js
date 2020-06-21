// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const AdminSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         max: 30
//     },
//     email: {
//         type: String,
//         required: true,
//         max: 30
//     },
//     institute: {
//         type: String,
//         required: true,
//         max: 30
//     },
//     branch: {
//         type: String,
//         required: true,
//         max: 30
//     },
//     resume: {
//         type: String,
//         required: true,
//     }
//     selected: {
//         type: String
//         default: "FALSE"
//     },
//     interview:{
//         organization:{
//             type: String
//             default: undefined
//         },
//         date:{
//             type: String
//             default: undefined
//         },
//         time: {
//             type: String
//             default: undefined
//         },
//         score: {
//             type: Map,
//             of: String
//             default: undefined
//         },
//         drawpad: {
//             type: [String],
//             default: undefined
//         },
//         notepad: {
//             type: String
//             default: undefined
//         },
//     }
// });
