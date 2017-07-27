var express = require("express");
var bodyParser = require("body-parser"); //Đọc thông tin người dùng gửi về
var morgan = require("morgan"); //Log request
var mongoose = require("mongoose"); //Khai báo kết nối với mongoose
var config = require("./config"); //Config để đọc được thông tin người dùng và lưu trữ sửa cho nhanh

var setupControllers = require("./api/controllers/setupController");
var todoControllers = require("./api/controllers/todoController");

//Khởi tạo
var app = express();
var port = process.env.PORT || 3000; //Cấu hình theo biến môi trường(Nếu port k có sẽ gán mặc định cổng 3000)
//Truy cập server
mongoose.connect(config.getDbConnectionString());

//Truy cập các middleware
app.use("/assets", express.static(__dirname + "/public"));
app.use(bodyParser.json()); //Dữ liệu muốn đọc từ người dùng là Json
app.use(bodyParser.urlencoded({ extended: true })); //Chấp nhận các kiểu dữ liệu post về server

app.use(morgan("dev")); //Log

app.set("view engine", "ejs");

//Định tuyến
app.get("/",function(req,res){
    res.render("index");
});

setupControllers(app);
todoControllers(app);


//Khởi động server
app.listen(port,function(){
    console.log("Ứng dụng đang chạy trên cổng: " + port);
})