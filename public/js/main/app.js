//Khai báo angular
var app = angular.module("app.todos", ["xeditable"]); //Khai báo phụ thuộc -> [] thư viện nào

app.run(function (editableOptions) {
    editableOptions.theme = 'bs3';
});

app.controller("todoController", ['$scope', 'svTodos', function ($scope, svTodos) {
    $scope.appName = "Công việc";
    $scope.formData = {}; //Chứa data khi thêm
    $scope.todos = []; //Chứa todos được load về
    //Hiện loading
    $scope.loading = true;

    //Load data
    svTodos.get().then(function (data) {
        $scope.todos = data.data;
        $scope.loading = false;
    });
    $scope.createTodo = function () {
        $scope.loading = true;
        var todo = {
            thongtin: $scope.formData.thongtin,
            isDone: false
        }
        svTodos.create(todo).then(function (data) {
            $scope.todos = data.data;
            $scope.formData.thongtin = "";
            $scope.loading = false;
        });
    } //Tạo mới

    $scope.updateTodo = function (todo) {
        $scope.loading = true;
        svTodos.update(todo).then(function (data) {
            $scope.todos = data.data;
            $scope.loading = false;
        });
    } //Update

    $scope.deleteTodo = function (todo) {
        $scope.loading = true;
        svTodos.delete(todo._id).then(function (data) {
            $scope.todos = data.data;
            $scope.loading = false;
        });
    } //Xóa
}]);