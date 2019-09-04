const app = require('express')();
const stripe = require('stripe')('sk_test_zyF2y2jXcwOmii029FBiaHff00t0f4CfKk');
var uuid = require('uuid');
bodyParser = require('body-parser');

app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/charge', async (req, res) => {
  console.log(req.body.amount);
  try {
    let { status } = stripe.charges.create(
      {
        amount: req.body.amount,
        currency: 'usd',
        source: 'tok_mastercard', // obtained with Stripe.js
        description: 'Charge for jenny.rosen@example.com'
      },
      {
        idempotency_key: uuid.v4()
      },
      function(err, charge) {
        // asynchronously called
        console.log('ERROR >>> ', err, charge);
      }
    );
    res.json({ status });
  } catch (err) {
    res.status(500).end(err);
  }
});

app.get('/balance', async (req, res) => {
  const result = await stripe.balance.retrieve();
  console.log(result);
  res.json(result);
});

app.listen(9000, () => console.log('Listening on port 9000'));
