const { Router } = require('express');
const { handlerLogin } = require('../controller/users.controller');

const router = Router();

router.post('/login', [], handlerLogin);

module.exports = router;
