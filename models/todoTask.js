const mongoose = require('mongoose');
// 스키마 작성으로 틀 작성하기


// const detailSchema = new mongoose.Schema({
//   detailcontent: {
//     type : String,
//     required: true
//   }
// });

// const todoTaskSchema = new mongoose.Schema({
//   content: {
//     type: String,
//     required: true
//   },
//   date: {
//     type: String,
//     required: true
//   },
//   detailList: [detailSchema]
// });

module.exports = mongoose.model('datalist', todoTaskSchema);