const { Router } = require('express');
const { handlerCreateHistory } = require('../controller/histories.controller');

const router = Router();

router.post('/create', [], handlerCreateHistory);

module.exports = router;
