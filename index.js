const morgan = require('morgan');
const express = require('express');
const app = express();
const pokemon = require('./Routes/pokemon');

app.use(morgan('dev')); //Este middleware nos ayuda a ver las peticiones que llegan al servidor
app.use(express.json());
app.use(express.urlencoded({extended: true}))


/*
VERBOS HTTP
GET: Obtener datos 
POST: Guardar datos
PATCH: Actualizar un dato (Ej. nombre)
PUT: Actualizar todos los elementos (Ej. nombre, apellido, edad)
DELETE: Eliminar datos
*/
app.get('/', (req, res) => {
    res.status(200).send("Bienvenido al pokedex");
});

app.use("/pokemon", pokemon);

app.use((req, res, next) => {
    return res.status(404).json({code: 404, message: "URL no encontrada"}); 
    });

app.listen(process.env.PORT || 3000, () => { 
    console.log("Server is running in port 3000");
});
