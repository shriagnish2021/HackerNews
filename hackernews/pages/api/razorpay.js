import Razorpay from "razorpay"
import shortid from "shortid"

var razorpay = new Razorpay({
    key_id:'rzp_test_ECHU5EC4Un1Ri7',
    key_secret:'tlPIConLzkFZ4fna8UuC8fFx'
})

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
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
