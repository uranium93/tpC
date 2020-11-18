import bunyan from 'bunyan';
import servicesConfig from '../../config/services';

export const logger = bunyan.createLogger({
    name: 'main-server',
    streams: [
        {
            path: servicesConfig.logsPath,
        },
        {
            stream: process.stdout,
        },
    ],
});
