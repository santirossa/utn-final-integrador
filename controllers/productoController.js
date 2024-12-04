const { Producto, Categoria } = require('../models');

const ProductoController = {
    list: async (req, res) => {
        try {
            const productos = await Producto.findAll({ include: Categoria });
            res.render('productos/list', { productos });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Error al buscar productos' });
        }
    },

    create: async (req, res) => {
        try {
            const categorias = await Categoria.findAll();
            res.render('productos/create', { categorias });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Error al cargar el formulario de creación' });
        }
    },

    store: async (req, res) => {
        const { nombre, descripcion, precio, categoria_id } = req.body;
        const imagen = req.file ? req.file.filename : null;
        try {
            await Producto.create({ nombre, descripcion, precio, imagen, categoria_id });
            res.redirect('/productos');
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Error al guardar el Producto' });
        }
    },

    edit: async (req, res) => {
        const { id } = req.params;
        try {
            console.log(`ID recibido: ${id}`);
            const producto = await Producto.findByPk(id);
            if (!producto) {
                return res.status(404).send({ message: 'Producto no encontrado' });
            }
            const categorias = await Categoria.findAll();
            res.render('productos/edit', { producto, categorias });
        } catch (err) {
            console.error('Error al cargar el formulario de edición:', err);
            res.status(500).send({ message: 'Error al cargar el formulario de edición' });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { nombre, descripcion, precio, categoria_id } = req.body;
        const imagen = req.file ? req.file.filename : null;
        try {
            const producto = await Producto.findByPk(id);
            producto.nombre = nombre;
            producto.descripcion = descripcion;
            producto.precio = precio;
            producto.imagen = imagen;
            producto.categoria_id = categoria_id;
            await producto.save();
            res.redirect('/productos');
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Error al actualizar el Producto' });
        }
    },

    destroy: async (req, res) => {
        const { id } = req.params;
        try {
            await Producto.destroy({ where: { id } });
            res.redirect('/productos');
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Error al eliminar el Producto' });
        }
    }
};

module.exports = ProductoController;
