const Models = require('../models/sequelize')

class TodoRepository {

    constructor(sequelize) {
        Models(sequelize);
        this.client = sequelize;
        this.models = sequelize.models;
    }

    async createTodo(body) {
        try {
            const todoItem = await this.models.TodoItem.create({
                title: body.title,
                description: body.description,
                isCompleted: body.isCompleted
            })
            return todoItem;
        } catch (err) {
            return err;
        }
    }
    async deleteTodoById(id) {
        try {
            await this.models.TodoItem.destroy({
                where: {
                  id: id
                }
              });
            return "deleted todo with id: " + id;
        } catch (err) {
            return err;
        }
    }

    async deleteTodos(ids) {
        try {
            await this.models.TodoItem.destroy({
                where: {
                  id: ids
                }
              });
            return "deleted todos with ids: " + ids;
        } catch (err) {
            return err;
        }
    }
    async editTodoById(id, body) {
        try {
            await this.models.TodoItem.update(body, { where: {id: id} });
            return "updated todo with id: " + id;
        } catch (err) {
            return err;
        }
    }
    async addTodoTagById(todoId, tagName) {
        try {
            const todoItem = await this.models.TodoItem.findByPk(todoId);
            if (todoItem === null) {
                return "TodoItem with id " + todoId + " not found";
            }
            
            var tag = await this.models.Tag.findOne({where: {tagName: tagName}});
            console.log("\n\n\n")
            console.log(tag)
            console.log("\n\n\n")

            if (tag === null) {
                tag = await this.models.Tag.create({
                    tagName: tagName
                })
            }
            console.log("\n\n\n")
            console.log(tag)
            console.log("\n\n\n")
            await todoItem.addTag(tag);

            return "todo with id: " + todoId + " appended tag " + tagName;
        } catch (err) {
            return err;
        }
    }
    async deleteTodoTagById(todoId, tagName) {
        try {
            const todoItem = await this.models.TodoItem.findByPk(todoId);
            if (todoItem === null) {
                return "TodoItem with id " + todoId + " not found";
            }
            
            const tag = await this.models.Tag.findOne({where: {tagName: tagName}});
            if (tag === null) {
                return  "Tag with name " + tagName + " not found";
            }

            await todoItem.removeTag(tag);
            return "todo with id: " + todoId + " removed tag " + tagName;
        } catch (err) {
            return err;
        }
    }
    async getSortedTodos(sortBy) {
        try {
            const sortedTodos = await this.models.TodoItem.find().sort(sortBy);
            return sortedTodos;
        } catch (err) {
            return err;
        }
    }
    async getAllTodos() {
        try {
            const allTodos = await this.models.TodoItem.findAll({
            include: {
                model: this.models.Tag,
                attributes: ['tagName'],
                through: { attributes: [] }
            }
            });
            
            return allTodos;
        } catch (err) {
            return err;
        }
    }
    async getTodoById(id) {
        try {
            const todo = await this.models.TodoItem.findOne({ where: {id: id}});
            return todo;
        } catch (err) {
            return err;
        }
    }
    async updateIsCompleted(id, body) {
        try {
            await this.models.TodoItem.update({isCompleted: body.isCompleted}, { where: {id: id} });
            return "isCompleted todo with id: " + id + " has been set to " + body.isCompleted;
        } catch (err) {
            return err;
        }
    }


}

module.exports = TodoRepository