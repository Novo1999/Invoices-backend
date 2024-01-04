import { StatusCodes } from 'http-status-codes'
import Invoice from '../model/invoiceModel.js'

export const getInvoices = async (req, res) => {
  const { userId } = req.auth
  const invoices = await Invoice.find({ createdBy: userId })
  res.status(StatusCodes.OK).json(invoices)
}

export const getInvoice = async (req, res) => {
  const { invoiceId } = req.params
  const { userId } = req.auth
  const invoice = await Invoice.find({ _id: invoiceId, createdBy: userId })
  res.status(StatusCodes.OK).json(invoice)
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

export const updateInvoiceStatus = async (req, res) => {
  const { userId } = req.auth
  const { invoiceId } = req.params
  const { status } = req.body
  const updatedInvoice = await Invoice.findOneAndUpdate(
    { _id: invoiceId, createdBy: userId },
    { status },
    { new: true }
  )
  res.status(StatusCodes.OK).json(updatedInvoice)
}
