const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (request, response, next) => {
  if (request.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = request.headers.authorization//.split(' ')[1] // "Bearer TOKEN"
    if (!token) {
      return response.status(401).json({message: 'Нет авторизации'})
    }
    request.user = jwt.verify(token, config.get('jwtSecret'));
    next()
  } catch (errorInfo) {

    response.status(401).json({message: 'Нет авторизации'})
  }
}
