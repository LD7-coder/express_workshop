
const express = require("express");
const pokemon = express.Router();
const db = require("../config/database");

pokemon.post("/",async (req,res,next) =>{
    const {pok_name,pok_height,pok_weight,pok_base_experience} = req.body
    if(pok_name && pok_height && pok_weight && pok_base_experience){
        let query = "INSERT INTO pokemon(pok_name, pok_height, pok_weight, pok_base_experience)";
        query += ` VALUES('${pok_name}',${pok_height},${pok_weight},${pok_base_experience})`

        const rows = await db.query(query)
        if(rows.affectedRows == 1){
            return res.status(201).json({code:201, message:"Pokemon insertado correctarmente"});
    }
        return res.status(500).json({code: 500,message:"Ocurrio un error"});
    }
    return res.status(500).json({code:500,message:"Campos incompletos"});
});

pokemon.get("/", async (req, res) => {
    const pkmn = await db.query("SELECT * FROM pokemon");
    res.status(201).json({code: 201, message: pkmn});
}); 

pokemon.get(/^\/(\d{1,3})$/, async (req, res) => { 
    const id = req.params[0];
    const rows = await db.query("SELECT * FROM pokemon WHERE pok_id = ?",[id]);
    //OPERADOR TERNARIO 
    // condicion ? true : false
    // Usarlo solo cuando queremos que se retorne algo
    (rows.length === 0) ? 
        res.status(404).send({code: 404, message: "El pokemon no existe"}) 
        : res.status(201).json({code: 201, message: rows[0]});
    });

pokemon.get(/^\/([A-Za-z]+)$/, async (req, res) => {
    const name = req.params[0].toLowerCase();
    const rows = await db.query("SELECT * FROM pokemon WHERE pok_name = ?",[name]);
    (!rows.length) ?   
        res.status(404).send({code: 404, message: "El pokemon no existe"}) 
        : res.status(201).json({code: 201, message: rows[0]});
});

module.exports = pokemon;