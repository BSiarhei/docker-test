const express = require('express');
const router = express.Router();

const dockerContainerService = require('../services/dockerContainerService');

router.get('/', async (req, res) => {

    const containers = await dockerContainerService.getList();
    res.render('index', { containers });
});

module.exports = router;
