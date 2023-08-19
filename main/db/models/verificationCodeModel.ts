import { DataTypes } from 'sequelize'

import { msAuthenticator } from '../mysql'

export const verificationCode = msAuthenticator.define('verification_code', {
    id: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: true
    },
    uid: {
        type: DataTypes.STRING,
        allowNull: true
    },
    search_key: {
        type: DataTypes.STRING,
        allowNull: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    used: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    experition_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
},
{ freezeTableName: true, tableName: 'verification_code' })