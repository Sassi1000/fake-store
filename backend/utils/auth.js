const jwt = require('jsonwebtoken')

exports.generateToken = _id => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '18s' })
}

exports.authenticateToken = (req, res, next) => {
    const auth = req.headers['authorization']
    const token = auth && auth.split(' ')[1]
    if (token == null) return res.status(401).json({ message: 'unautharized' })

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) return res.status(403).json({ message: 'unautharized' })
        req.userId = payload._id
        next()
    })
}