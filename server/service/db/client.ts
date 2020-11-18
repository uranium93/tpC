import { Sequelize } from 'sequelize';
import dbConfig from '../../../config/database';

const sequelize = new Sequelize(dbConfig.dbName, dbConfig.dbUser, dbConfig.dbPassword, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

export default sequelize;
