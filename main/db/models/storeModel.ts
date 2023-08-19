import { DataTypes } from 'sequelize';

import { msChiper } from '../mysql';

export const store = msChiper.define('Store', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    phone: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
    
},
{ freezeTableName: true, tableName: 'Store' })