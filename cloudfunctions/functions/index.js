const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const stripe = require('stripe')('sk_test_51JeaCvKLjO5zSSsbwKg7t7ivMy8H9fnveUdAlBRPBAPfSVcmwEdEfIG8cheGWyuBvKqRrDvVZqwHVE3HxyKOXsPc00Mj27A8SG');
exports.completePaymentWithStripe = functions.https.onRequest(
    (request, response)=>{
        console.log(request.body,"this is req body")
        stripe.charges.create({
            amount:request.body.amount,
            currency:request.body.currency,
            source:request.body.token
        }).then(charge=>{
            response.send(charge)
        }).catch(error=>{
            console.log(error)
        })
    }
)
exports.listPayment = functions.https.onRequest(
    (request, response)=>{

        stripe.paymentIntents.list({
        }).then((response)=>{
            console.log(response)
        }).catch((err)=>{
            console.log(err.message)
        })
        //   console.log(paymentIntent,"this is payemnt intent")
        //   console.log(response,"this is response")
    }
)
// const paymentIntent =  stripe.paymentIntents.retrieve(
//     'ch_3JeyVXKLjO5zSSsb1k9pFu7F'
//   );
//   console.log(paymentIntent,"this is payemnt intent")