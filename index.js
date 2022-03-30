const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config();
app.use(cors());
const { MongoClient, ServerApiVersion } = require('mongodb');
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.udbnn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const database = client.db('reactAuth');
        console.log('database connected successfully');
        const usersCollection = database.collection('users');

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            console.log(result);

            res.json(result);
        })
        app.get('/users', async (req, res) => {
            const cursor = usersCollection.find({});
            const rating = await cursor.toArray();

            res.send(rating);
        })

    }
    finally {
        // await client.close()
    }


}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`listening at ${port}`);
})