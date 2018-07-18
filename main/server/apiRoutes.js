const express = require('express');

const router = express.Router();
const containerRouter = express.Router();

const containerController = require('../controllers/containerController');

const wrapper = handler => async (req, res, next) => {
    try {
        await handler(req, res, next);
    } catch (error) {
        next(error);
    }
};

containerRouter.get('/', wrapper(containerController.getList));

containerRouter.get('/:containerId/logs', wrapper(containerController.getContainerLogs));

containerRouter.delete('/:containerId/logs', wrapper(containerController.unlinkContainerLogs));

containerRouter.post('/:containerId/logs', wrapper(containerController.linkContainerLogs));

router.use('/api/containers', containerRouter);

module.exports = router;
