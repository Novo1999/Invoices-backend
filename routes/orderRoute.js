import { Router } from 'express'
import {
  addOrder,
  deleteOrder,
  editOrder,
  getOrder,
} from '../controllers/orderController.js'

const router = Router()
router
  .route('/')
  .get(getOrder)
  .post(addOrder)
  .patch(editOrder)
  .patch(deleteOrder)

export default router
