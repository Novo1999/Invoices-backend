import { Router } from 'express'
import {
  addInvoice,
  deleteInvoice,
  editInvoice,
  getInvoice,
  getInvoices,
  updateInvoiceStatus,
} from '../controllers/invoicesController.js'

const router = Router()

router.get('/', getInvoices)
router.get('/:invoiceId', getInvoice)
router.post('/', addInvoice)
router.patch('/:id', editInvoice)
router.patch('/mark/:invoiceId', updateInvoiceStatus)
router.delete('/:id', deleteInvoice)

export default router
