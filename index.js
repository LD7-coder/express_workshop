const express = require('express');
const app = express();

/*
VERBOS HTTP
GET: Obtener datos 
POST: Guardar datos
PATCH: Actualizar un dato (Ej.nombre)
PUT: Actualizar todos los elementos (Ej. nombre, apellido, edad)
DELETE: Eliminar datos
*/
app.listen(3000, () => {

    console.log("Server is running...");
});

app.get('/', (req, res, next) => {
    res.status(200); // 200 es que todo esta bien
    res.send('Hello Worlds');
});