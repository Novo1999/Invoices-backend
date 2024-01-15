import { StatusCodes } from 'http-status-codes'
import Order from '../model/orderModel.js'

export const getOrder = async (req, res) => {
  const { userId } = req.auth
  const userOrder = await Order.findOne({ createdBy: userId })
  res.status(StatusCodes.OK).json(userOrder)
}

export const addOrder = async (req, res) => {
  const { data: order } = req.body
  console.log(order)
  const { userId } = req.auth
  const existingOrder = await Order.findOne({ createdBy: userId })
  if (!existingOrder) {
    const createdOrder = await Order.create({ order, createdBy: userId })
    return res.status(StatusCodes.OK).json(createdOrder)
  }
  existingOrder?.order.push(order)
  const updatedOrder = await existingOrder.save()
  res.status(StatusCodes.OK).json(updatedOrder)
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

export const deleteOrder = async (req, res) => {
  const { userId } = req.auth
  console.log('body', req.body)
  const { id } = req.body
  console.log(id)
  const orders = await Order.findOne({ createdBy: userId })
  console.log('ORDER', orders)
  orders.order = orders.order.filter((value) => value !== id)
  const newOrder = await orders.save()
  res.status(StatusCodes.OK).json(newOrder)
}
