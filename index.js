const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, Collection, ObjectId } = require('mongodb');
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello from chit-chat-server');
});

// user : user1
//password : g0GUXyqDPnAleuiB



const uri = "mongodb+srv://user1:g0GUXyqDPnAleuiB@chit-chat-db.2tst3fl.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const usersCollection = client.db('chit-chat-db').collection('users');

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            console.log(result);
            res.send(result);
        });
        app.get('/users', async (req, res) => {
            const query = {};
            const cursor = usersCollection.find(query);
            const result = await cursor.toArray();
            console.log(result);
            res.send(result);
        });
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const user = await usersCollection.findOne(query);
            console.log(user);
            res.send(user);
        })
    }
    finally {

    }
}

run().catch(err => console.log(err));

app.listen(port, () => {
    console.log('chit-chat server is running in port :', port);
});