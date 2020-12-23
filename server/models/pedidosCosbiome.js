const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let pedidosCosbiome = new Schema({
    numPedidos: {
        type: Number,
        required: [true, 'El numero de pedido es necesario']
    }
});

module.exports = mongoose.model('pedidosCosbiome', pedidosCosbiome);