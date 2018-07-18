const dockerContainerService = require('../services/dockerContainerService');
const logRepository = require('../repositories/logRepository');

class LogsService {
    get(containerId) {
        return logRepository.getLogStream(containerId);
    }

    unlink(containerId) {
        return logRepository.removeLogStream(containerId);
    }

    async link(containerId) {
        const [ logs, stream ] = await Promise.all([dockerContainerService.logs(containerId), dockerContainerService.attach(containerId)]);

        await logRepository.logStream(containerId, stream, logs);
    }
}

module.exports = new LogsService();
