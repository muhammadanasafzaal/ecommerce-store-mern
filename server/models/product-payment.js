import mongoose from 'mongoose';

let ProductPaymentSchema = new mongoose.Schema(
    {
        payId: Number,
        amountPaid: String,
        billingName: String,
        billingEmail: String,
        billingCountry: String,
        billingState: String,
        billingPostal: Number,
        cardNumber: Number,
        cardExpireDate: Date,
        cardCvv: Number,
        products: [
            {
                p_id: Number,
                title: String,
                price: Number,
                category: String,
                image: String,
                quantity: Number,
                total: Number
            }
        ],
    },
    { timestamps: true },
);

const ProductPayment = mongoose.model("ProductPayment", ProductPaymentSchema);
export default ProductPayment;