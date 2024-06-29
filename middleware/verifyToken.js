const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config();

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(403).send({ message: 'Need token to access' });
    }

    token = token.split(' ')[1];

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'Failed to authenticate token' });
      }

      req.user = decoded;
      next();

    });
}

module.exports = verifyToken