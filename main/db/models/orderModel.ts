import { DataTypes } from 'sequelize'

import { msChiper } from '../mysql'
import { store } from './storeModel'

export const order = msChiper.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    statusId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    storeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
},
{ freezeTableName: true, tableName: 'Order' })

order.belongsTo(store, {foreignKey: 'storeId'})
store.hasMany(order, {foreignKey: 'storeId'})
