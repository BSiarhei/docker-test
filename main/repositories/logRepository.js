const fs = require('fs-extra');
const path = require('path');

const LOGS_FOLDER = 'logs';

fs.ensureDir(LOGS_FOLDER);

const NotFoundError = require('../errors/notFoundError');

class LogRepository {
    constructor() {
        this.STREAMS_SOURCE = {};
        this.LOGS_FOLDER = LOGS_FOLDER;
    }

    async logStream(key, stream, defaultLogs) {
        if (defaultLogs) {
            await fs.writeFile(this._getLogPath(key), defaultLogs);
        }

        const writeStream = await fs.createWriteStream(this._getLogPath(key), {
            flags: defaultLogs ? 'a' : 'w'
        });

        stream.pipe(writeStream);

        this.STREAMS_SOURCE[key] = stream;

        writeStream.on('error', (error) => {
            console.log('error', error);
        });
    }

    async getLogStream(key) {
        try {
            await fs.stat(this._getLogPath(key));
        } catch (error) {
            throw new NotFoundError('Log is not found', error);
        }

        return fs.createReadStream(this._getLogPath(key));
    }

    async removeLogStream(key) {
        const stream = this.STREAMS_SOURCE[key];
        if (!stream) {
            throw new NotFoundError('Log is not found');
        }

        stream.destroy();

        delete this.STREAMS_SOURCE[key];

        await fs.unlink(this._getLogPath(key));
    }

    _getLogPath(fileName) {
        return path.join(this.LOGS_FOLDER, `${fileName}.txt`)
    }
}

module.exports = new LogRepository();
