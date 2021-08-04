import Razorpay from "razorpay"
import shortid from "shortid"

var razorpay = new Razorpay({
    key_id:'rzp_test_ECHU5EC4Un1Ri7',
    key_secret:'tlPIConLzkFZ4fna8UuC8fFx'
})

export default async (req, res) => {
    const payment_capture = 1
    const amount = 299;
    const currency = 'INR'
    try {
        const response = await razorpay.orders.create({
            amount: (amount*100).toString(),
            currency,
            receipt:shortid.generate(),
            payment_capture
        })
        res.json({
            id:response.id,
            currency:response.currency,
            amount:response.amount
        })
    } catch (error) {
        console.log(error)
    }
    
    
  };