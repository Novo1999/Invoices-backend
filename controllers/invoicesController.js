import { StatusCodes } from 'http-status-codes'
import Invoice from '../model/invoiceModel.js'

export const getInvoices = async (req, res) => {
  const { userId } = req.auth
  const invoices = await Invoice.find({ createdBy: userId })
  res.status(StatusCodes.OK).json(invoices)
}

export const getInvoice = async (req, res) => {
  res.send('get invoice')
}

export const addInvoice = async (req, res) => {
  res.send('add invoice')
}

export const editInvoice = async (req, res) => {
  res.send('edit invoice')
}

export const deleteInvoice = async (req, res) => {
  res.send('delete invoice')
}
