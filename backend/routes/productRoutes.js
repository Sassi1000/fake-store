const express = require('express')
const productControllers = require('./../controllers/productControllers')
const router = express.Router()
// const { authenticateToken } = require('./../utils/auth')

router.route('/')
    .get(productControllers.getProducts)
    .post(productControllers.createProduct)

router.route('/:_id')
    .put(productControllers.updateProduct)
    .delete(productControllers.deleteProduct)

module.exports = router