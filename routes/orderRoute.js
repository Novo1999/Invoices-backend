import { Router } from 'express'
import {
  addOrder,
  editOrder,
  getOrder,
} from '../controllers/orderController.js'

const router = Router()
router.route('/').get(getOrder).post(addOrder).patch(editOrder)

export default router
