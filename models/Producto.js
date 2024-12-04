const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Categoria = require('./Categoria')

const Producto = sequelize.define('Producto', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    precio: {
        type: DataTypes.INTEGER
    },
    imagen: {
        type: DataTypes.STRING
    },
    categoria_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'categoria',
            key: 'id'
            }
    }
},
    {
        tableName: 'productos',
        timestamps: false
});

    Producto.belongsTo(Categoria, { foreignKey: 'categoria_id'} );

module.exports = Producto;



