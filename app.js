const concesionarias = require('./concesionarias')
const fs=require('fs')
const compradores = JSON.parse(fs.readFileSync('./data/compradores.json', 'utf-8'))

//console.log(concesionarias.autos)
console.log(concesionarias.autosParaLaVenta)
let autos=compradores.autos
let persona=compradores[0]

console.log(concesionarias.puedeComprar(autos,persona))