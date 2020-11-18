import { Model, DataTypes } from 'sequelize';
import dbClient from '../service/db/client';

// Our table data
interface UserAttributes {
    id: number;
    role: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    active: boolean;
}

// Optional fields when creating or building
interface UserCreationAttributes {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    active?: boolean;
}

// Instance Model <what_we_get_from_query , what_we_pass_to_create_record>
interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}

const Users = dbClient.define<UserInstance>(
    'Users',
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        role: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING(200),
        },
        lastName: {
            type: DataTypes.STRING(200),
        },
        password: {
            type: DataTypes.STRING(200),
        },

        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    { tableName: 'Users' },
);
export default Users;
