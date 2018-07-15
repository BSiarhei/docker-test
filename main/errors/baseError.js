'use strict';

class BaseError extends Error {
    constructor(message, innerError) {
        super(message);

        this.name = this.constructor.name;
        this.status = 500;
        this.innerError = innerError;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = BaseError;
