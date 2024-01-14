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
  console.log(req.body)
  const {
    itemList,
    fromCity,
    fromPostCode,
    fromCountry,
    clientStreet,
    toCity,
    toPostCode,
    toCountry,
    date,
    street,
    payment,
  } = req.body
  const { userId } = req.auth
  const invoice = await Invoice.create({
    ...req.body,
    createdBy: userId,
    items: itemList.map((item) => {
      item.name = item.itemName
      delete item.itemName
      return item
    }),
    billFrom: {
      street,
      city: fromCity,
      country: fromCountry,
      postCode: fromPostCode,
    },
    billTo: {
      street: clientStreet,
      city: toCity,
      country: toCountry,
      postCode: toPostCode,
    },
    amount: itemList.reduce((acc, curr) => acc + curr.price * curr.quantity, 0),
    due: payment,
    invoiceDate: date,
  })
  res.status(StatusCodes.CREATED).json(invoice)
}

export const editInvoice = async (req, res) => {
  res.send('edit invoice')
}

export const deleteInvoice = async (req, res) => {
  const { userId } = req.auth
  const { id } = req.params
  await Invoice.findOneAndDelete({ createdBy: userId, _id: id })
  res.status(StatusCodes.OK).json({ msg: 'Deleted Invoice Successfully' })
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
