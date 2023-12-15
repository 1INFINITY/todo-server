const Models = require('../models/sequelize')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
            await this.models.TodoItem.update(body, { where: { id: id } });
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

            var tag = await this.models.Tag.findOne({ where: { tagName: tagName } });
            if (tag === null) {
                tag = await this.models.Tag.create({
                    tagName: tagName
                })
            }
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

            const tag = await this.models.Tag.findOne({ where: { tagName: tagName } });
            if (tag === null) {
                return "Tag with name " + tagName + " not found";
            }

            await todoItem.removeTag(tag);
            return "todo with id: " + todoId + " removed tag " + tagName;
        } catch (err) {
            return err;
        }
    }
    async getSortedTodos(createdAtOrder, updatedAtOrder, filterTags, filterTitle) {
        try {
            var order = []
            if (createdAtOrder == "ASC" || createdAtOrder == "DESC") {
                order.push(["createdAt", createdAtOrder])
            }
            if (updatedAtOrder == "ASC" || updatedAtOrder == "DESC") {
                order.push(["updatedAt", updatedAtOrder])
            }
            if (filterTitle == null) {
                filterTitle = ""
            }
            let include = {
                model: this.models.Tag,
                attributes: ['tagName'],
                through: { attributes: [] },
            }
            if (filterTags != null && filterTags.length > 0) {
                include.where = {
                    tagName: {
                        [Op.in]: filterTags,
                    },
                };
            }


            const sortedTodos = await this.models.TodoItem.findAll({
                include: include,
                order: order,
                where: {
                    title: { [Op.iLike]: `%${filterTitle}%` },
                }
            });
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
            const todo = await this.models.TodoItem.findOne({
                where: { id: id },
                include: {
                    model: this.models.Tag,
                    attributes: ['tagName'],
                    through: { attributes: [] }
                }
            });
            return todo;
        } catch (err) {
            return err;
        }
    }
    async updateIsCompleted(id, body) {
        try {
            await this.models.TodoItem.update({ isCompleted: body.isCompleted }, { where: { id: id } });
            return "isCompleted todo with id: " + id + " has been set to " + body.isCompleted;
        } catch (err) {
            return err;
        }
    }


}

module.exports = TodoRepository