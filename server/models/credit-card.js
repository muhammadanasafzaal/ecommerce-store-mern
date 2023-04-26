import mongoose from 'mongoose';

let CreditCardAccountSchema = new mongoose.Schema(
    {
        cardId: Number,
        cardHolderName: String,
        cardNumber: String, 
        cardCVV: Number,
        cardExpiry: Date,
        creditAmount: Number
    },
    { timestamps: true },
);
const CreditCardAccount = mongoose.model("CreditCardAccount", CreditCardAccountSchema);
export default CreditCardAccount;