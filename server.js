import express from 'express'
import 'express-async-errors'
import 'dotenv/config'
import morgan from 'morgan'
import invoiceRouter from './routes/invoiceRouter.js'
import orderRouter from './routes/orderRoute.js'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node'
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js'
import cors from 'cors'
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(express.json())

const port = process.env.PORT || 6100
app.use(cors())

app.use(
  '/api/invoices/protected',
  ClerkExpressRequireAuth({}),
  errorHandlerMiddleware,
  invoiceRouter
)

app.use(
  '/api/invoices/order',
  ClerkExpressRequireAuth({}),
  errorHandlerMiddleware,
  orderRouter
)

try {
  await mongoose.connect(process.env.MONGO_URL)
  app.listen(port, () => console.log(`Server listening on port ${port}`))
} catch (error) {
  console.log(error)
  process.exit(1)
}
