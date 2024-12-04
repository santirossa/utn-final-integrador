const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const {sequelize} = require('./models');
const ProductoRouter = require('./routes/productoRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', ProductoRouter);

app.listen(3000, async() => {
    console.log('Server is running on port 3000');
    try{
        await sequelize.authenticate();
        console.log('Base de datos conectada');
    }
    catch(error){
        console.log('Error al conectar a la base de datos', error);
        }
}); //Conexión al puerto y a la base de datos
