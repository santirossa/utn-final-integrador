const sequelize = require('../config/database');


const Categoria = require('./Categoria');
const Producto = require('./Producto');


Categoria.hasMany(Producto, { foreignKey: 'categoria_id' });
Producto.belongsTo(Categoria, { foreignKey: 'categoria_id' });




module.exports ={
    sequelize,
    Categoria,
    Producto
}