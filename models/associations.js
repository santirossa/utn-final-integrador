const Categoria = require('./Categoria');
const Producto = require('./Producto');



Categoria.belongsTo(Producto, { foreignKey: 'categoria_id' });
Producto.hasMany(Categoria, { foreignKey: 'categoria_id' });


module.exports = { Categoria, Producto};