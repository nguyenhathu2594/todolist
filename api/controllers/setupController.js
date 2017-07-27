//Khởi tạo Controller
var Todos = require("../models/todosModel"); //Truy cập tới models

//Export các API
module.exports = function (app) {

    app.get("/api/setupTodos", function (req, res) {
        //Thử khởi tạo ứng dụng ban đầu với dữ liệu ban đầu
        //seed dữ liệu
        var seedTodos = [
            {
                thongtin: "Học Nodejs",
                isDone: false
            }
        ];
        //Gọi khởi tạo
        Todos.create(seedTodos, function (err, results) {
            res.send(results);
        });
    });
}