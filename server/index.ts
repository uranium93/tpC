/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
// module-alias/register should be always imported first

import express, { Request, Response } from 'express';
import next from 'next';
import expressSession from 'express-session';
import { v4 as uuidV4 } from 'uuid';
import services from '../config/services';
import { logger } from './tools/logger';
import dbClient from './service/db/client';
import api from './api';
import sessionFileStore from 'session-file-store';
import passport from './service/passport';

const FileStore = sessionFileStore(expressSession);

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const { port } = services;
try {
    dbClient.authenticate().then(() => {
        logger.info('Connection To DATABASE [Success V]');
        dbClient
            .sync({ alter: true, force: false })
            .then(() => {
                logger.info('SYNC SUCCESS');
            })
            .catch((e) => {
                logger.error('SYNC FAIL', e);
            });
    });
} catch (error) {
    console.error('Connection To DATABASE [Fail X]', error);
}
(async () => {
    try {
        await app.prepare();
        const server = express();
        server.use(express.json());
        server.use(
            expressSession({
                genid: (req) => {
                    console.log('Inside the session middleware');
                    console.log(req.sessionID);
                    return uuidV4();
                },
                store: new FileStore(),
                secret: 'MY_SESSION_SECRET',
                resave: false,
                saveUninitialized: true,
            }),
        );
        server.use(passport.initialize());
        server.use(passport.session());
        server.use('/api', api);
        server.all('*', (req: Request, res: Response) => {
            return handle(req, res);
        });
        server.listen(port, (err?: any) => {
            if (err) throw err;
            logger.info(
                `> Ready on localhost:${port} - env ${process.env.NODE_ENV ? process.env.NODE_ENV : '[ Local ]'}`,
            );
        });
    } catch (e) {
        logger.error(e);
        process.exit(1);
    }
})();
