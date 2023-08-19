import { Op, Sequelize } from 'sequelize';

import { order } from '../models/orderModel';
import { store } from '../models/storeModel';

export const getOrderConfirmed = async () => {
    try {
        const result = await order.findOne({
            attributes: ['id'],
            include: [{
                model: store,
                attributes: ['phone'],
                required: true
            }],
            where: {
                [Op.and]: [
                    { statusId: 11 },
                    { deletedAt: { [Op.is]: undefined } },
                    Sequelize.literal('`Store`.`phone` IS NOT NULL')
                ]
            },
            order: Sequelize.literal('RAND()'),
            limit: 1,
        });

        return result.toJSON()

    } catch (error) {
        console.error('error finding the store order confirmed', { err: error })
    }
}