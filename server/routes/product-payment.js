import express from 'express'
import { fetchPayments, fetchPaymentById, createPayment, deletePayment } from '../controllers/product-payment.js'

const router = express.Router()

router.get("/", fetchPayments)
router.get("/fetch/", fetchPaymentById)
router.post("/fetchPaymentById/", fetchPaymentById)
router.post("/createPayment", createPayment)
router.delete("/delete/:id", deletePayment)

export default router;