const Product = require('./../models/productModel')
const asyncHandler = require('express-async-handler')

exports.getProducts = asyncHandler(async (req, res) => {
    // const { skip, cat, price, name } = req.query
    // const filter = { cat, price, name }
    // const products = await Product.find().limit(2).skip(Number(skip) || 0)
    const products = await Product.find()
    res.status(200).json({
        status: 'success',
        products
    })
})

exports.createProduct = asyncHandler(async (req, res) => {
    const product = req.body
    const newProduct = await Product.create(product)
    res.status(201).json({
        status: 'success',
        newProduct
    })
})

exports.updateProduct = asyncHandler(async (req, res) => {
    const { _id } = req.params
    const updatedDetails = req.body
    const updatedProduct = await Product.findByIdAndUpdate(_id, updatedDetails, { new: true })
    res.status(201).json({
        status: 'success',
        updatedProduct
    })
})

exports.deleteProduct = asyncHandler(async (req, res) => {
    const { _id } = req.params
    const deletedProduct = await Product.findByIdAndDelete(_id)
    res.status(200).json({
        status: 'success',
        deletedProduct
    })
})