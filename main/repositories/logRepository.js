const fs = require('fs-extra');
const path = require('path');

const LOGS_FOLDER = 'logs';

fs.ensureDirSync(LOGS_FOLDER);
fs.emptyDirSync(LOGS_FOLDER);

const NotFoundError = require('../errors/notFoundError');

class LogRepository {
    constructor() {
        this.STREAMS_SOURCE = {};
        this.LOGS_FOLDER = LOGS_FOLDER;
    }

    async logStream(key, stream, defaultLogs) {
        if (fs.pathExists(this._getLogPath(key))) {
            await this._clearKey(key);
        }

        if (defaultLogs) {
            await fs.writeFile(this._getLogPath(key), defaultLogs);
        }

        const writeStream = await fs.createWriteStream(this._getLogPath(key), {
            flags: defaultLogs ? 'a' : 'w'
        });

        stream.pipe(writeStream);

        this.STREAMS_SOURCE[key] = stream;

        writeStream.on('error', (error) => {
            console.log('write stream error', error);
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
        if (!this.STREAMS_SOURCE[key]) {
            throw new NotFoundError('Log is not found');
        }

        await this._clearKey(key);
    }

    _getLogPath(fileName) {
        return path.join(this.LOGS_FOLDER, `${fileName}.txt`);
    }

    async _clearKey(key) {
        const stream = this.STREAMS_SOURCE[key];

        if (stream) {
            stream.destroy();
        }

        delete this.STREAMS_SOURCE[key];

        await fs.remove(this._getLogPath(key));
    }
}

module.exports = new LogRepository();
