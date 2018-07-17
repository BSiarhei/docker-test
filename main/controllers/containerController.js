const dockerContainerService = require('../services/dockerContainerService');
const logRepository = require('../repositories/logRepository');

class ContainerController {
    async getList(req, res, next) {
        const containers = await dockerContainerService.getList();

        res.send(containers);
    }

    async getContainerLogs(req, res, next) {
        const logStream = await logRepository.getLogStream(req.params.containerId);

        res.type('text/plain');
        logStream.pipe(res);
    }

    async unlinkContainerLogs(req, res, next) {
        await logRepository.removeLogStream(req.params.containerId);

        res.end();
    }

    async linkContainerLogs(req, res, next) {
        const containerId = req.params.containerId;

        const [ logs, stream ] = await Promise.all([dockerContainerService.logs(containerId), dockerContainerService.attach(containerId)]);

        await logRepository.logStream(containerId, stream, logs);

        res.end();
    }
}

module.exports = new ContainerController();
