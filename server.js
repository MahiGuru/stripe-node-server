const app = require("express")();
const stripe = require("stripe")("sk_test_zyF2y2jXcwOmii029FBiaHff00t0f4CfKk");

app.use(require("body-parser").text());

app.post("/charge", async (req, res) => {
    console.log(req.body)
    try {
      let {status} = stripe.charges.create({
        amount: 2000,
        currency: "usd",
        source: "tok_mastercard", // obtained with Stripe.js
        description: "Charge for jenny.rosen@example.com"
      }, {
        idempotency_key: "b7wmQPqkOsWL1WwE"
      }, function(err, charge) {
        // asynchronously called
        console.log("ERROR >>> ", err);
      });
  
      res.json({status});
    } catch (err) {
      
      res.status(500).end(err);
      
    }
  });


  app.get("/balance", async (req, res) => {
    const result = await stripe.balance.retrieve(); 
    res.send({result});
    
  });



  app.listen(9000, () => console.log("Listening on port 9000")); 