import { StatusCodes } from 'http-status-codes'
import Order from '../model/orderModel.js'

export const getOrder = async (req, res) => {
  const { userId } = req.auth
  const userOrder = await Order.findOne({ createdBy: userId })
  res.status(StatusCodes.OK).json(userOrder)
}

export const addOrder = async (req, res) => {
  res.send('add invoice')
}

export const editOrder = async (req, res) => {
  const order = req.body
  const { userId } = req.auth
  const updatedOrder = await Order.findOneAndUpdate(
    { createdBy: userId },
    { order }
  )
  res.status(StatusCodes.OK).json(updatedOrder)
}
