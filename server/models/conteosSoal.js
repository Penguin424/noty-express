const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let conteoSoal = new Schema({
    numPedidos: {
        type: Number
    },
    numClientes: {
        type: Number
    },
    numRutas: {
        type: Number
    }
});

module.exports = mongoose.model('conteosSoal', conteoSoal);