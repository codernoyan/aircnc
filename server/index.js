const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
require('dotenv').config();
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 5000;

// middleware's
app.use(cors());
app.use(express.json());

// Database Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ufdxsbo.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
})

async function run() {
  try {
    const homesCollection = client.db('aircncDb').collection('homes');
    const usersCollection = client.db('aircncDb').collection('users');
    const bookingsCollection = client.db('aircncDb').collection('bookings');

    // save users
    app.put('/user/:email', async (req, res) => {
      try {
        const email = req.params.email;
        const user = req.body;
        const filter = { email: email };
        const options = { upsert: true };
        const updatedDoc = {
          $set: user
        };
        const result = await usersCollection.updateOne(filter, updatedDoc, options);
        console.log(result);

        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '1d'
        })
        
        console.log(token);
        res.send({ result, token });

      } catch (error) {
        res.send({
          success: false,
          error: error.message
        })
      }
    });

    app.post('/booking', async (req, res) => {
      try {
        const bookingData = req.body;
        const result = await bookingsCollection.insertOne(bookingData);
        res.send(result);

      } catch (error) {
        res.send({
          success: false,
          error: error.message
        })
      }
    })

    console.log('Database Connected...')
  } finally {
  }
}

run().catch(err => console.error(err))

app.get('/', (req, res) => {
  res.send('Server is running...')
})

app.listen(port, () => {
  console.log(`Server is running...on ${port}`)
})
