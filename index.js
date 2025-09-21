const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const { pokemon } = require('./pokedex.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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

app.post("/pokemon",(req,res,next) =>{
    res.status(200).send(req.body.name)
});

app.get("/pokemon", (req, res) => {
    res.status(200).send(pokemon);
});

app.get(/^\/pokemon\/(\d{1,3})$/, (req, res) => { 
    const id = req.params[0] - 1;
    //OPERADOR TERNARIO 
    // condicion ? true : false
    // Usarlo solo cuando queremos que se retorne algo
    (id < 0 || id > pokemon.length - 1) ? 
        res.status(404).send("El pokemon no existe") 
        : res.status(200).send(pokemon[id]);
    });

app.get(/^\/pokemon\/([A-Za-z]+)$/, (req, res) => {
    const name = req.params[0].toLowerCase();
    const pk = pokemon.find(p => p.name.toLowerCase() === name);
    (!pk) ?   
        res.status(404).send("El pokemon no existe")
        : res.status(200).send(pk);
});
