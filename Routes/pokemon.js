
const express = require("express");
const pokemon = express.Router();
const db = require("../config/database");

pokemon.post("/",(req,res,next) =>{
    res.status(200).send(req.body.name)
});

pokemon.get("/", async (req, res) => {
    const pkmn = await db.query("SELECT * FROM pokemon");
    res.status(200).json({code: 1, message: pkmn});
}); 

pokemon.get(/^\/(\d{1,3})$/, async (req, res) => { 
    const id = req.params[0];
    const rows = await db.query("SELECT * FROM pokemon WHERE pok_id = ?",[id]);
    //OPERADOR TERNARIO 
    // condicion ? true : false
    // Usarlo solo cuando queremos que se retorne algo
    (rows.length === 0) ? 
        res.status(404).send({code: 404, message: "El pokemon no existe"}) 
        : res.status(200).json({code: 1, message: rows[0]});
    });

pokemon.get(/^\/([A-Za-z]+)$/, async (req, res) => {
    const name = req.params[0].toLowerCase();
    const rows = await db.query("SELECT * FROM pokemon WHERE pok_name = ?",[name]);
    (!rows.length) ?   
        res.status(404).send({code: 404, message: "El pokemon no existe"}) 
        : res.status(200).json({code: 1, message: rows[0]});
});

module.exports = pokemon;