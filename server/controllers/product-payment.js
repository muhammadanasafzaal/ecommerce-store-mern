import ProductPayment from '../models/product-payment.js'
import CreditCardAccount from '../models/credit-card.js'
import jwt from 'jsonwebtoken'

export const fetchPayments = async (req, res) => {
    // console.log(token)
    try {
        const payments = await ProductPayment.find()
        res.status(200).json(payments);

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const fetchPaymentById = async (req, res) => {
    try {
        const { id } = req.params
        const payment = await ProductPayment.find({ payId: id })
        res.send(payment);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPayment = async (req, res) => {
    try {
        const payments = await ProductPayment.find();
        const lastPayment = payments[payments.length - 1]
        const {
            amountPaid,
            billingName,
            billingEmail,
            billingCountry,
            billingState,
            billingPostal,
            cardNumber,
            cardExpireDate,
            cardCvv,
            products
        } = req.body
        if (
            !amountPaid ||
            !billingName ||
            !billingEmail ||
            !billingCountry ||
            !billingState ||
            !billingPostal ||
            !cardNumber ||
            !cardExpireDate ||
            !cardCvv ||
            !products
        ) {
            res.status(400).json({ message: "Fields should not be empty" });
            return;
        }
        else {
            // const cardDetails = await CreditCardAccount.findOne({ cardCVV: cardCvv, cardNumber: cardNumber })
            const cardDetails = await CreditCardAccount.findOne()
            // if (cardDetails) {
                if (cardDetails.creditAmount < amountPaid) {
                    res.status(400).json({ error: 'Not enough credit', status_code: 404 });
                }
                else {
                    const deductAmount = await CreditCardAccount.findOneAndUpdate({ cardCVV: cardCvv }, { $inc: { creditAmount: -amountPaid } });
                    if (deductAmount) {
                        const newPayment = new ProductPayment({
                            payId: lastPayment != null && lastPayment.payId != null ? lastPayment.payId + 1 : 1,
                            amountPaid: amountPaid,
                            billingName: billingName,
                            billingEmail: billingEmail,
                            billingCountry: billingCountry,
                            billingState: billingState,
                            billingPostal: billingPostal,
                            cardNumber: cardNumber,
                            cardExpireDate: cardExpireDate,
                            cardCvv: cardCvv,
                            products: products
                        })
                        const savePayment = await newPayment.save();
                        res.status(200).json({ message: 'Payment Successful', status_code: 200 });
                    }
                    else {
                        res.status(200).json({ error: 'Invalid Card CVV', status_code: 400 });
                    }
                }
            // }
            // else {
            //     res.status(404).json({ error: 'Credit card not found', status_code: 404 });
            // }
        }
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// export const updateProduct = async ( req, res) => {
//     try {
//         const { p_id, title, category, price, description} = req.body;
//         const image = req.file.path

//         console.log(req.body)

//         // const validBody = Object.values(req.body).every(val => val != null || val != undefined)
//         if (!p_id || !title || !category || !price) {
//             res.status(400).send({ message: "Content can not be empty!" });
//             return;
//         }
//         else{
//            const updateProduct = await Product.findOneAndUpdate({p_id: p_id}, {$set:{title:title, category: category, description: description, price: price, image: image}}, {new: true});
//             res.status(200).json(updateProduct)
//         }
//     } 
//     catch (error) {
//         res.status(404).json({ message: error.message })
//     }
// }

export const deletePayment = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).send({ message: "Contents can not be empty!" });
            return;
        }
        else {
            const deletePayment = await ProductPayment.findOneAndDelete({ payId: id });
            res.status(200).json(deletePayment)
        }
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
