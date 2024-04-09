const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    cat: String,
    name: String,
    price: Number,
    image: String
})


const Product = mongoose.model('Product', productSchema)

module.exports = Product

