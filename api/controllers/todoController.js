//Tạo ra các API để thao tác

var Todos = require("../models/todosModel");

//Hàm đọc csdl
function getTodos(res) {
    //Gọi tới csdl nếu không truyền tham số gọi(tìm kiếm nào) mặc định trả ra toàn bộ
    Todos.find(function (err, todos) {
        if (err) {
            res.status(500).json(err); //Trả về lỗi
        }
        else {
            res.json(todos); //Trả về danh sách
        }
    });
}

module.exports = function (app) {
    //Định tuyến/nghĩa ResfulAPI

    //Get all Todos
    app.get("/api/todos", function (req, res) {
        getTodos(res);
    });

    //Tìm kiếm theo ID
    app.get("/api/todos/:id", function (req, res) {
        Todos.findById({ _id: req.params.id }, function (err, todos) {
            if (err) {
                throw err;
            } else {
                res.json(todos);
            }
        });
    });

    //Tạo mới
    app.post("/api/todos", function (req, res) {
        var todo = {
            thongtin: req.body.thongtin,
            isDone: req.body.isDone
        };

        Todos.create(todo, function (err, todos) {
            if (err) {
                throw err;
            }
            else {
                getTodos(res);
            }
        });
    });

    //Sửa
    app.put("/api/todos", function (req, res) {
        if (!req.body._id) {
            res.status(500).send("Không có ID");
        } else {
            Todos.update({
                _id: req.body._id
            }, {
                    thongtin: req.body.thongtin,
                    isDone: req.body.isDone
                }, function (err, todos) {
                    if (err) {
                        return res.status(500).json(err);
                    } else {
                        getTodos(res);
                    }
                });
        }
    });

    //Xóa
    app.delete("/api/todos/:id", function (req, res) {
        Todos.remove({
            _id: req.params.id
        }, function (err, todos) {
            if (err) {
                return res.status(500).json(err);
            } else {
                getTodos(res);
            }
        })
    });
}