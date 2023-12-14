const express = require('express');
const router = express.Router();

const TodoRepository = require('../../repositories/TodoRepository');

module.exports = (postgresClient) => {
    const repository = new TodoRepository(postgresClient)

    router.post('/tag/:id', async (req, res) => {
        try {
            const todoItemInfo = await repository.addTodoTagById(req.params.id, req.body.tagName);
            res.send(todoItemInfo);
        } catch(err) {
            return next(err);
        }
    });
    router.delete('/tag/:id', async (req, res) => {
        try {
            const todoItemInfo = await repository.deleteTodoTagById(req.params.id, req.body.tagName);
            res.send(todoItemInfo);
        } catch(err) {
            return next(err);
        }
    });
    router.get('/get', async (req, res) => {

        try {
            const todoItem = await repository.getTodoItem();
            res.send(todoItem);
        } catch(err) {
            return next(err);
        }
    });
    router.post('/create', async (req, res, next) => {
        try {
            const todoItem = await repository.createTodo(req.body);
            res.send(todoItem);
        } catch(err) {
            return next(err);
        }
    });
    router.delete('/delete/:id', async (req, res, next) => {
        try {
            const deletedTodoInfo = await repository.deleteTodoById(req.params.id);
            res.send(deletedTodoInfo);
        } catch(err) {
            return next(err);
        }
    });
    router.delete('/delete', async (req, res, next) => {
        try {
            const deletedTodos = await repository.deleteTodos(req.body.ids);
            res.send(deletedTodos);
        } catch(err) {
            return next(err);
        }
    });
    router.put('/update/:id', async (req, res, next) => {
        try {
            const editedTodo = await repository.editTodoById(req.params.id, req.body);
            res.send(editedTodo);
        } catch(err) {
            return next(err);
        }
    });
    router.get('/get/sorted', async (req, res, next) => {
        try {
            const sortedTodos = await repository.getSortedTodos(req.query.sortBy);
            res.send(sortedTodos);
        } catch(err) {
            return next(err);
        }
    });
    router.get('/get/all', async (req, res, next) => {
        try {
            const allTodos = await repository.getAllTodos();
            res.send(allTodos);
        } catch(err) {
            return next(err);
        }
    });
    router.get('/get/:id', async (req, res, next) => {
        try {
            const todo = await repository.getTodoById(req.params.id);
            res.send(todo);
        } catch(err) {
            return next(err);
        }
    });
    router.patch('/update/complete/:id', async (req, res, next) => {
        try {
            const updatedTodoInfo = await repository.updateIsCompleted(req.params.id, req.body);
            res.send(updatedTodoInfo);
        } catch(err) {
            return next(err);
        }
    });

    return router;
}


