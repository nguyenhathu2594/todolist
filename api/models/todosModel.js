//Định nghĩa khai báo Model

var mongoose = require("mongoose"); //Khai báo kết nối với mongoose

//Tạo ánh xạ
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    thongtin: String,
    isDone: Boolean
});

//Tạo Models
var Todos = mongoose.model("Todos", todoSchema);

module.exports = Todos;