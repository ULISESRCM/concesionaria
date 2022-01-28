const fs = require('fs');
const autosDB = JSON.parse(fs.readFileSync('./data/autos.json', 'utf-8'))
const escribirJson = (data) => fs.writeFileSync('./data/autos.json', JSON.stringify(data), 'utf-8')

const concesionarias = {
    autos: autosDB,
    buscarAuto: function (patente) {
         let autoEncontrado = [] 
        this.autos.forEach(auto => {
            if(auto.patente == patente){
                autoEncontrado.push(auto)
            }
        });
        if(autoEncontrado.length > 0){
            return autoEncontrado[0]
        }else{
            return null
        }
        
        //let autoEncontrado = this.autos.filter(auto => auto.patente == patente);
        /*let auto = this.autos.find((auto) => auto.patente == patente);
        return auto ? auto : null*/
        //return this.autos.find(auto => auto.patente == patente) ?? null
        /* if(auto){
            return auto
        }else{
            return null
        }  */ 

    },
    venderAuto:function(patente){
        let autosEncontrado =this.buscarAuto(patente);
        if(autosEncontrado){
            autosEncontrado.vendido=true;

        }
        escribirJson(this.autos)
    },
    autosParaLaVenta: function () {
        return this.autos.filter((auto) => auto.vendido === false)
    },
    autosNuevos: function () {
        let autosParaLaVenta = this.autosParaLaVenta()
        let autosNuevos = autosParaLaVenta.filter((auto) => auto.km < 100)
        return autosNuevos
    },
    listaDeVentas: function () {
        let autosVendidos = this.autos.filter((auto) => auto.vendido);
        return autosVendidos.map(auto => auto.precio)
    },
    totalDeVentas: function () {
        let listaDeVentas = this.listaDeVentas()
        let total = listaDeVentas.reduce((acum, num)=> {
            return acum + num;
        })
        return total;
    },
    /*totalDeVentas: function () {
        return this.listaDeVentas().length > 0 ?
        this.listaDeVentas().reduce((acum, num) => acum + num) 
        : 0
    }*/
    puedeComprar: function(auto,persona){
        if((auto.precio <= persona.capacidadDePagoTotal) &&
            //true
           (auto.precio / auto.cuotas) <= persona.capacidadDePagoEnCuotas
           //true
           ){
           return true
        }else{
           return false 
        }
    },
    //version resumida
    /*puedeComprar: function(auto,persona){
       return auto.precio <= persona.capacidadDePagoTotal && auto.precio / auto.cuotas <= persona.capacidadDePagoEnCuotas 
    },*/
    autosQuePuedeComprar: function (persona) {
        let autosDisponibles = this.autosParaLaVenta(); // Obtengo los autos disponibles
        let autosQuePuedeComprar = []; // creo una lista vacia
        autosDisponibles.forEach((auto) => { // itero o recorro el coleccion de autos disponibles
            if(this.puedeComprar(auto, persona)){ // en cada iteración evalúo si la persona puede comprar el auto
                autosQuePuedeComprar.push(auto) // si la persona puede comprar, guardo el auto en la lista
            }// si no puede comprar, no hace nada
        })
        return autosQuePuedeComprar; // retorno la lista de los autos que puede comprar (si los hay), caso contrario devuelve un array vacío
    }

};

module.exports = concesionarias