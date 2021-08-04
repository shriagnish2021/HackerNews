const { createLogger, transports, format } = require('winston');
import path from 'path'

const logger = createLogger({
  transports: [
    new transports.File({
      name: 'error-file',
      filename: '../error.log',
      level: 'error',
      json: true,
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.json()
      ),
    }),
  ],
});

module.exports = logger;
