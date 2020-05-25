const {Router} = require('express');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config')
const User = require('../models/User');
const router = Router();

const failLoginInfo = 'При входе произошла ошибка. Проверьте введенный адрес электронной почты и пароль либо создайте учетную запись';

router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6})
  ],
  async (request, response) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({message: errors.array()})
      }

      const {email, password} = request.body;
      const candidate = await User.findOne({email});

      if (candidate) {
        return response.status(400).json({
          message: `Пользователь с таким ${email} email уже есть`
        })
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({email, password: hashedPassword});

      await user.save();

      response.status(201).json({message: 'Пользователь создан'});

    } catch (errorInfo) {
      response.status(500).json({message: `Error ${errorInfo}`});
    }
  })
router.post(
  '/login',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
  ],
  async (request, response) => {
    try {
      const errors = validationResult(request)

      if (!errors.isEmpty()) {
        return response.status(400).json({message: errors.array()})
      }
      const {email, password} = request.body;
      const user = await User.findOne({email});

      if (!user) {
        return response.status(400).json({message: failLoginInfo})
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return response.status(400).json({message: failLoginInfo})
      }
      const token = jwt.sign({userId: user.id}, config.get('jwtSecret'), {expiresIn: '1m'});

      response.json({token, userId: user.id})

    } catch (errorInfo) {
      response.status(500).json({message: `Error ${errorInfo}`})
    }
  })

module.exports = router
