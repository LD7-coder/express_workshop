const express = require('express');
const app = express();
const { pokemon } = require('./pokedex.json');

/*
VERBOS HTTP
GET: Obtener datos 
POST: Guardar datos
PATCH: Actualizar un dato (Ej. nombre)
PUT: Actualizar todos los elementos (Ej. nombre, apellido, edad)
DELETE: Eliminar datos
*/
app.listen(process.env.PORT || 3000, () => { 
    console.log("Server is running...");
});

app.get('/', (req, res) => {
    res.status(200).send("Bienvenido al pokedex");
});

app.get("/pokemon/all", (req, res) => {
    res.status(200).send(pokemon);
});

app.get(/^\/pokemon\/(\d{1,3})$/, (req, res) => {
    const id = parseInt(req.params[0]) - 1; 
    if (id < 0 || id > pokemon.length - 1) {
        return res.status(404).send("El pokemon no existe");
    }
    res.status(200).send(pokemon[id]);
});

app.get("/pokemon/:name", (req, res) => {
    const name = req.params.name.toLowerCase();
    for (let i = 0; i < pokemon.length; i++) {
        if (pokemon[i].name.toLowerCase() === name) {
            return res.status(200).send(pokemon[i]);
        }
    }
    res.status(404).send("El pokemon no existe");
});
