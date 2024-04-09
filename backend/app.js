const express = require('express')
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)

app.use((err, req, res, next) => {
    res.status(500).json({
        status: 'failed',
        message: err.message
    })
})

app.all('*', (req, res) => {
    res.status(404).json({
        status: 'fail',
        message: 'The requested route is not exist on this server'
    })
})

module.exports = app