const dockerContainerService = require('../services/dockerContainerService');
const logsService = require('../services/logsService');

class ContainerController {
    async getList(req, res, next) {
        const containers = await dockerContainerService.getList();

        res.send(containers);
    }

    async getContainerLogs(req, res, next) {
        const logStream = await logsService.get(req.params.containerId);

        res.type('text/plain');
        logStream.pipe(res);
    }

    async unlinkContainerLogs(req, res, next) {
        await logsService.unlink(req.params.containerId);

        res.end();
    }

    async linkContainerLogs(req, res, next) {
        await logsService.link(req.params.containerId);

        res.end();
    }
}

module.exports = new ContainerController();
