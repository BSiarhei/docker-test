'use strict';

const BaseError = require('./baseError');

class NotFoundError extends BaseError {
    constructor(message, innerError) {
        super(message, innerError);

        this.status = 404;
    }
}

module.exports = NotFoundError;
