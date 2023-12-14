const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const TodoItem = sequelize.define('TodoItem', {
        title: {
          type: DataTypes.STRING,
          allowNull: false
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false
        },
        isCompleted: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        },
      }, {
        // Other model options go here
      });

      const Tag = sequelize.define('Tag', {
        tagName: {
          type: DataTypes.STRING,
          allowNull: false
        }
      });
    
      // Многие-ко-многим отношение между тудушкой и тегом
      TodoItem.belongsToMany(Tag, { through: 'TodoItemTag' });
      Tag.belongsToMany(TodoItem, { through: 'TodoItemTag' });

      sequelize.sync({force: true});

      return TodoItem;
}
