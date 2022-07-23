const db = require("../db");

module.exports.initDatabase = () => db.initDatabase(["todos"]);
module.exports.createTodo = (todo_name) => db.addItem("todos", {todo_name, completed: false});
module.exports.getTodos = () => db.getTable("todos");
module.exports.removeTodo = (id) => db.removeItem("todos", id);
module.exports.updateTodo = (id, update) => db.updateItem("todos", id, update);
